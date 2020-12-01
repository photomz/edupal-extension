const getQueryParam = (url, param) => {
  // Expects a raw URL

  const regexedParam = param.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  const regexS = `[\\?&]${regexedParam}=([^&#]*)`;
  const regex = new RegExp(regexS);
  const results = regex.exec(url);
  if (
    results === null ||
    (results && typeof results[1] !== 'string' && results[1].length)
  ) {
    return '';
  }
  return decodeURIComponent(results[1]).replace(/\+/g, ' ');
};

const defaultParams = {
  campaignParams() {
    const campaignKeywords = 'utm_source utm_medium utm_campaign utm_content utm_term'.split(
      ' '
    );
    let kw = '';
    const params = {};
    campaignKeywords.forEach(campaignKeywords, (kwkey) => {
      kw = getQueryParam(document.URL, kwkey);
      if (kw.length) {
        params[kwkey] = kw;
      }
    });

    return params;
  },

  searchEngine(referrer) {
    if (referrer.search('https?://(.*)google.([^/?]*)') === 0) {
      return 'google';
    }
    if (referrer.search('https?://(.*)bing.com') === 0) {
      return 'bing';
    }
    if (referrer.search('https?://(.*)yahoo.com') === 0) {
      return 'yahoo';
    }
    if (referrer.search('https?://(.*)duckduckgo.com') === 0) {
      return 'duckduckgo';
    }
    return null;
  },

  searchInfo(referrer) {
    const search = defaultParams.searchEngine(referrer);
    const param = search !== 'yahoo' ? 'q' : 'p';
    const ret = {};

    if (search !== null) {
      ret.$search_engine = search;

      const keyword = getQueryParam(referrer, param);
      if (keyword.length) {
        ret.mp_keyword = keyword;
      }
    }

    return ret;
  },

  /**
   * This function detects which browser is running this script.
   * The order of the checks are important since many user agents
   * include key words used in later checks.
   */
  browser(userAgent, vendor = '', opera) {
    if (opera || userAgent.includes(' OPR/')) {
      if (userAgent.includes('Mini')) {
        return 'Opera Mini';
      }
      return 'Opera';
    }
    if (/(BlackBerry|PlayBook|BB10)/i.test(userAgent)) {
      return 'BlackBerry';
    }
    if (userAgent.includes('IEMobile') || userAgent.includes('WPDesktop')) {
      return 'Internet Explorer Mobile';
    }
    if (userAgent.includes('Edge')) {
      return 'Microsoft Edge';
    }
    if (userAgent.includes('FBIOS')) {
      return 'Facebook Mobile';
    }
    if (userAgent.includes('Chrome')) {
      return 'Chrome';
    }
    if (userAgent.includes('CriOS')) {
      return 'Chrome iOS';
    }
    if (userAgent.includes('UCWEB') || userAgent.includes('UCBrowser')) {
      return 'UC Browser';
    }
    if (userAgent.includes('FxiOS')) {
      return 'Firefox iOS';
    }
    if (vendor.includes('Apple')) {
      if (userAgent.includes('Mobile')) {
        return 'Mobile Safari';
      }
      return 'Safari';
    }
    if (userAgent.includes('Android')) {
      return 'Android Mobile';
    }
    if (userAgent.includes('Konqueror')) {
      return 'Konqueror';
    }
    if (userAgent.includes('Firefox')) {
      return 'Firefox';
    }
    if (userAgent.includes('MSIE') || userAgent.includes('Trident/')) {
      return 'Internet Explorer';
    }
    if (userAgent.includes('Gecko')) {
      return 'Mozilla';
    }
    return '';
  },

  /**
   * This function detects which browser version is running this script,
   * parsing major and minor version (e.g., 42.1). User agent strings from:
   * http://www.navigator.userAgentstring.com/pages/navigator.userAgentstring.php
   */
  browserVersion(userAgent, vendor, opera) {
    const browser = defaultParams.browser(userAgent, vendor, opera);
    const versionRegexs = {
      'Internet Explorer Mobile': /rv:(\d+(\.\d+)?)/,
      'Microsoft Edge': /Edge\/(\d+(\.\d+)?)/,
      Chrome: /Chrome\/(\d+(\.\d+)?)/,
      'Chrome iOS': /CriOS\/(\d+(\.\d+)?)/,
      'UC Browser': /(UCBrowser|UCWEB)\/(\d+(\.\d+)?)/,
      Safari: /Version\/(\d+(\.\d+)?)/,
      'Mobile Safari': /Version\/(\d+(\.\d+)?)/,
      Opera: /(Opera|OPR)\/(\d+(\.\d+)?)/,
      Firefox: /Firefox\/(\d+(\.\d+)?)/,
      'Firefox iOS': /FxiOS\/(\d+(\.\d+)?)/,
      Konqueror: /Konqueror:(\d+(\.\d+)?)/,
      BlackBerry: /BlackBerry (\d+(\.\d+)?)/,
      'Android Mobile': /android\s(\d+(\.\d+)?)/,
      'Internet Explorer': /(rv:|MSIE )(\d+(\.\d+)?)/,
      Mozilla: /rv:(\d+(\.\d+)?)/,
    };
    const regex = versionRegexs[browser];
    if (regex === undefined) {
      return null;
    }
    const matches = userAgent.match(regex);
    if (!matches) {
      return null;
    }
    return parseFloat(matches[matches.length - 2]);
  },

  os() {
    const a = navigator.userAgent;
    if (/Windows/i.test(a)) {
      if (/Phone/.test(a) || /WPDesktop/.test(a)) {
        return 'Windows Phone';
      }
      return 'Windows';
    }
    if (/(iPhone|iPad|iPod)/.test(a)) {
      return 'iOS';
    }
    if (/Android/.test(a)) {
      return 'Android';
    }
    if (/(BlackBerry|PlayBook|BB10)/i.test(a)) {
      return 'BlackBerry';
    }
    if (/Mac/i.test(a)) {
      return 'Mac OS X';
    }
    if (/Linux/.test(a)) {
      return 'Linux';
    }
    if (/CrOS/.test(a)) {
      return 'Chrome OS';
    }
    return '';
  },

  device(userAgent) {
    if (/Windows Phone/i.test(userAgent) || /WPDesktop/.test(userAgent)) {
      return 'Windows Phone';
    }
    if (/iPad/.test(userAgent)) {
      return 'iPad';
    }
    if (/iPod/.test(userAgent)) {
      return 'iPod Touch';
    }
    if (/iPhone/.test(userAgent)) {
      return 'iPhone';
    }
    if (/(BlackBerry|PlayBook|BB10)/i.test(userAgent)) {
      return 'BlackBerry';
    }
    if (/Android/.test(userAgent)) {
      return 'Android';
    }
    return '';
  },

  referringDomain(referrer) {
    const split = referrer.split('/');
    if (split.length >= 3) {
      return split[2];
    }
    return '';
  },

  properties() {
    return {
      $os: defaultParams.os(),
      $browser: defaultParams.browser(
        navigator.userAgent,
        navigator.vendor,
        window.opera
      ),
      $referrer: document.referrer,
      $referring_domain: defaultParams.referringDomain(document.referrer),
      $device: defaultParams.device(navigator.userAgent),
      $current_url: window.location.href,
      $browser_version: defaultParams.browserVersion(
        navigator.userAgent,
        navigator.vendor,
        window.opera
      ),
      $screen_height: window.screen.height,
      $screen_width: window.screenwidth,
      mp_lib: 'web',
      time: Date.now() / 1000, // epoch time in seconds
    };
  },

  people_properties() {
    return {
      $os: defaultParams.os(),
      $browser: defaultParams.browser(
        navigator.userAgent,
        navigator.vendor,
        window.opera
      ),

      $browser_version: defaultParams.browserVersion(
        navigator.userAgent,
        navigator.vendor,
        window.opera
      ),
    };
  },

  pageviewInfo(page) {
    return {
      mp_page: page,
      mp_referrer: document.referrer,
      mp_browser: defaultParams.browser(
        navigator.userAgent,
        navigator.vendor,
        window.opera
      ),
      mp_platform: defaultParams.os(),
    };
  },
};

export default defaultParams;

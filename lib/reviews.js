const STORES = {
  appStore: require('app-store-scraper'),
  gplayStore: require('google-play-scraper'),
};

// .sort:
// appStore { RECENT: 'mostRecent', HELPFUL: 'mostHelpful' }
// gplayStore { NEWEST: 0, RATING: 1, HELPFULNESS: 2 }

const STORES_CONFIG = {
  appStore: {
    appId: 'com.liftango.app',
  },
  gplayStore: {
    appId: 'com.liftango',
  },
};

const STORES_NAME = Object.keys(STORES_CONFIG);

module.exports = getAllReviews = async (props = {}) => {
  const promises = STORES_NAME.map(name => {
    const config = STORES_CONFIG[name];
    return STORES[name].reviews(Object.assign(config, props));
  });

  const result = await Promise.all(promises)
  .then(([...args]) => {
    return args.reduce((memo, reviews, index) => {
      return memo.concat(reviews.map(r => Object.assign(r, {
        store: STORES_NAME[index],
      })));
    }, []);
  });

  return result;
};

/* TODO
// compute average
// merge all together, adding metadata "store"

Common props:
id
userName
url
score
title
text

ios: version, userUrl
android: userImage, date, replyDate, replyText

*/

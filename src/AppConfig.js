/**
 * configuration object for this application.
 */
var servers = {
  development: 'http://localhost:8091'
}

var environment = servers.development

var appConfig = {
  /*
    when showing stock ticker information, our history is determined 
    by these settings.  Do we want to go back in days, weeks, months and
    how many of that unit do we wish to show history for.
    
    Example:
    tickerHistory.rangeUnit = 'months'
    tickerHistory.range = 20

    would tell us to return the last 20 months of stock prices for that stock
  */    
  tickerHistory: { 
    rangeUnit: 'days',
    range:10
  },
  /*
    how many months do we get data for our dashboard page
  */
  dashboardBackwardsRange: 8,
  /*
    api key to the place where we get stock information from
  */
 apiKey: 'e6339560753446378128f0e2551c7310',
  /*
    service endpoints
  */
  locationEndpoint: `${environment}/manuscript/location`,
  chapterEndpoint: `${environment}/manuscript`,
  manuscriptEndpoint: `${environment}/manuscript`,
  characterEndpoint: `${environment}/manuscript`,

  countryEndpoint: 'https://restcountries.eu/rest/v2/all?fields=name;alpha3Code',
  countryByCodeEndpoint: 'https://restcountries.eu/rest/v2/alpha?codes='
}

module.exports = appConfig

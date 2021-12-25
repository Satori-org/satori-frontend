/**
 * JS API
 */
import dataUpdater from './dataUpdater'
class datafeeds {

  /**
   * JS API
   * @param {*Object} vue vue
   */
  constructor(vue) {
    this.self = vue
    this.barsUpdater = new dataUpdater(this)
  }

  /**
   * @param {*Function} callback
   * `onReady` should return result asynchronously.
   */
  onReady(callback) {
    return new Promise((resolve, reject) => {
      let configuration = this.defaultConfiguration()
      if (this.self.getConfig) {
        configuration = Object.assign(this.defaultConfiguration(), this.self.getConfig())
      }
      resolve(configuration)
    }).then(data => callback(data))
  }

  /**
   * @param {*String} symbolName
   * @param {*Function} onSymbolResolvedCallback
   * @param {*Function} onResolveErrorCallback
   * `resolveSymbol` should return result asynchronously.
   */
  resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
    return new Promise((resolve, reject) => {
      let symbolInfo = this.defaultSymbol()
      if (this.self.getSymbol) {
        symbolInfo = Object.assign(this.defaultSymbol(), this.self.getSymbol())
      }
      resolve(symbolInfo)
    }).then(data => onSymbolResolvedCallback(data)).catch(err => onResolveErrorCallback(err))
  }

  /**
   * @param {*Object} symbolInfo
   * @param {*String} resolution
   * @param {*Number} rangeStartDate
   * @param {*Number} rangeEndDate
   * @param {*Function} onDataCallback
   * @param {*Function} onErrorCallback
   */
  getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate, onDataCallback, onErrorCallback) {
    const onLoadedCallback = data => {
      data && data.length ? onDataCallback(data, { noData: false }) : onDataCallback([], { noData: true })
    }
    this.self.onLoadedCallback = onLoadedCallback;
    this.self.getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate, onLoadedCallback)
  }

  /**
   *
   * @param {*Object} symbolInfo
   * @param {*String} resolution
   * @param {*Function} onRealtimeCallback
   * @param {*String} subscriberUID
   * @param {*Function} onResetCacheNeededCallback
   */
  subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
    this.self.onResetCacheNeededCallback = onResetCacheNeededCallback;
    this.barsUpdater.subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback)
  }

  /**
   * Unsubscribe from K line data
   * @param {*String} subscriberUID
   */
  unsubscribeBars(subscriberUID) {
    this.barsUpdater.unsubscribeBars(subscriberUID)
  }

  /**
   * default Setting
   */
  defaultConfiguration() {
    return {
      supports_search: true,
      supports_group_request: false,
      supported_resolutions: ['1', '5', '15', '30', '60','240','480','720', '1D', '2D', '3D', '1W', '1M'],
      supports_marks: true,
      supports_timescale_marks: true,
      supports_time: true
    }
  }

  /**
   * Default Product Information
   */
  defaultSymbol() {
    return {
      'name': 'BTCUSDT',
      'timezone': 'Asia/Shanghai',
      'minmov': 1,
      'minmov2': 0,
      'pointvalue': 1,
      'fractional': false,
      'session': '24x7',
      'has_intraday': true,
      'has_no_volume': false,
      'description': 'BTCUSDT',
      'pricescale': 1,
      'ticker': 'BTCUSDT',
      'has_weekly_and_monthly': true,
      'supported_resolutions': ['1', '5', '15', '30', '60','240','480','720', '1D', '2D', '3D', '1W', '1M']
    }
  }
}

export default datafeeds

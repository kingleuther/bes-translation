/* global env */

module.exports = {
    /**
     * Locale Configuration
     *
     * This is for the language to be used in the system.
     */
    default: env.LOCALE || 'en',

    /**
     * Locale Path
     *
     * This is where you store your locale
     */
    path: env.LOCALE_PATH || '/storage/lang'
}

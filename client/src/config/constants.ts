export default {
    signUp: { name: 'SIGNUP_SUCCESS' },
    signIn: { name: 'SIGNIN_SUCCESS' },
    userInfo: { name: 'DISPATCH_USER_INFO' },
    setNav: { name: 'SET_NAVIGATION_DIMENSIONS' },
    setStreamerLoading: { name: 'SET_STREAMER_LOADING' },
    setReceiverLoading: { name: 'SET_RECEIVER_LOADING' },
    setStreamerMotion: { name: 'SET_STREAMER_MOTION_DETECT' },
    setLastSessions: {name: "SET_LAST_SESSIONS"},
    setLastAlerts: {name: "SET_LAST_ALERTS"},
    setLiveSessions: {name: 'SET_LIVE_SESSIONS'},
    api: { url: `${process.env.API_URL}/` },
    // api: { url: 'http://localhost:1337/' },
}

export const formatTime = (time) => {
    var myDate = new Date(time * 1000)
    return myDate.toLocaleString('en-US')
}
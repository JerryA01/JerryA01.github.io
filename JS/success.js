let url = location.href
let success = url.replace(/.*=/, '')
document.getElementById('success').innerHTML = "Your card **** **** **** " + success + ' has been saved.'
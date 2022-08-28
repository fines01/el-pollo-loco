/**
 * Checks if a user is on a mobile or on a desktop device.
 * Slightly adapted from following SOURCE: 
 * https://medium.com/@kevinkoobs/how-to-detect-if-a-user-uses-a-mobile-device-with-javascript-f19e26d22a9b
 * (article is from 05-29-2020). 
 */
function checkIfUserIsOnMobileDevice() {
   let userAgent = navigator.userAgent.toLowerCase();
   let width = screen.availWidth;
   let height = screen.availHeight;
   if (userAgent.includes('mobi') || userAgent.includes('tablet')) return true;
   if (userAgent.includes('android')) {
      if (height > width && width < 800) return true; // Screen is higher than it’s wide, so we have portrait mode
      if (width > height && height < 800) return true; // Screen is wider than it’s high, so we have landscape mode
   }
   return false;
}

/**
 * Logs the detected user's device type (mobile or desktop) in the console
 */
function logDevice() {
   if (userIsOnMobileDevice) 
      console.log('CHECK: You are on a mobile device.');
    else 
      console.log('CHECK: You are on a desktop device.');
}

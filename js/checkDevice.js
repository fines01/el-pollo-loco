/**
 * Checks if a user is on a mobile device or on a desktop
 * SOURCE: 
 * https: //medium.com/@kevinkoobs/how-to-detect-if-a-user-uses-a-mobile-device-with-javascript-f19e26d22a9b
 * Function/ article is from 05-29-2020, so maybe a bit old. 
 * @todo Check!
 */

let userAgent = navigator.userAgent.toLowerCase(),
    width = screen.availWidth,
    height = screen.availHeight,
    userIsOnMobileDevice = checkIfUserIsOnMobileDevice(userAgent);

if (userIsOnMobileDevice) {
    alert('You are on mobile!');
} else {
    console.log('You arere on desktop!');
}

function checkIfUserIsOnMobileDevice(userAgent) {
   if(userAgent.includes('mobi') || userAgent.includes('tablet')){
      return true;
   }
   if(userAgent.includes('android')) {
      if(height > width && width < 800) {
         // Screen is higher than it’s wide, so we have portrait mode
         return true;
      }
      if(width > height && height < 800) {
         // Screen is wider than it’s high, so we have landscape mode
         return true;
      }
   }
   return false;
}
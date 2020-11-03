import { Notify } from 'quasar'

window.onerror = function (msg, url, lineNo, columnNo, error) {
	const string = msg.toLowerCase();
	const substring = "script error";
	if (string.indexOf(substring) > -1){
		alert('Script Error: See Browser Console for Detail');
	} else {
		const message = [
			'Message: ' + msg,
			'URL: ' + url,
			'Line: ' + lineNo,
			'Column: ' + columnNo,
			'Error object: ' + JSON.stringify(error)
		].join(' - ');
		
		alert(message);
	}
	
	return false;
};

export default async ({ Vue }) => {
  Vue.config.errorHandler = (err, vm, info) => {
  	Notify.create({
		  type: 'negative',
		  message: `${err.message}: Open console to view.`
	  })
	  
	  console.error(vm)
	  console.info(info)
    // err: error trace
    // vm: component in which error occured
    // info: Vue specific error information such as lifecycle hooks, events etc.

    // TODO: Perform any custom logic or log to server
    
  };
}

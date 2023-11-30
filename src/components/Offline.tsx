import { useBooleanState } from 'webrix/hooks';
import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Offline({ children }:any) {
	const { value: online, setFalse: setOffline, setTrue: setOnline } = useBooleanState(navigator.onLine);
	
	useEffect(() => {
		if (!online) { return void console.log("Has perdido la conexión") }
		
	}, [online]);
	
	useEffect(() => {
		window.addEventListener('online', setOnline);
		window.addEventListener('offline', setOffline);
		
		return () => {
			window.removeEventListener('online', setOnline);
			window.removeEventListener('offline', setOffline);
		};
	}, []);
		
	return (
		<>
			{
				!online	&& <div className='bg-black text-white font-bold w-screen fixed text-center' >No tienes conexión</div>
			}

			{children}
		</>
	)
}
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import axios from 'axios';
import { API_URL } from './constant.js';

function App() {
	const [count, setCount] = useState(0);

	const handleSubmit = async () => {
		const res = await axios.get(API_URL).catch((error) => {
			console.log('error in get', error);
		});

		console.log(res);
	};

	return (
		<>
			<button onClick={handleSubmit}>click</button>
		</>
	);
}

export default App;

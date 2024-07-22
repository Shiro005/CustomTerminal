import React, { useState } from 'react';

const TerminalDisplay = () => {
    const [inputValue, setInputValue] = useState('');
    const [output, setOutput] = useState(['']);

    const colorTerminal = ['red', 'yellow', 'green'];

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            processCommand(inputValue);
            setInputValue('');
        }
    };

    const processCommand = (command) => {
        const newOutput = [...output, `$ ${command}`];
        switch (command.toLowerCase()) {
            case 'help':
                newOutput.push(
                    "Currently this app is under developed so stay tuned ! more command are activate soon for more details check out https://shriyash.vercel.app"
                );
                break;
            case 'portfolio':
                newOutput.push(
                    `This is my portfolio link https://shriyash.vercel.app copy and paste it on browser tech that are used in this application`
                );
                break;
            case 'clear':
                setOutput(['']);
                return;
            default:
                newOutput.push(`command not found: ${command}`);
                break;
        }
        setOutput(newOutput);
    };

    return (
        <div className='w-full h-screen m-3 rounded-2xl bg-gray-800 shadow-2xl p-0'>
            <div className='bg-gray-900 p-4 rounded-2xl flex flex-row items-center justify-between'>
                <div className='flex flex-row items-center'>
                    {colorTerminal.map((color, index) => (
                        <div key={index} className='h-4 w-4 rounded-3xl mx-2' style={{ background: color }}></div>
                    ))}
                </div>
                <div className='font-bold text-gray-300 px-4 text-xl'>
                    <h2>WebReich Terminal</h2>
                </div>
            </div>
            <div className='p-4 h-full overflow-y-auto'>
                <h3 className='text-gray-500 font-semibold pb-3 text-xl'>To see all command type help</h3>
                {output.map((line, index) => (
                    <div key={index} className='text-green-500 text-xl font-mono'>
                        {line}
                    </div>
                ))}
                <div className='flex'>
                    <span className='text-red-500 text-xl font-mono'>$ </span>
                    <input
                        type="text"
                        className="bg-gray-800 text-red-500 border-none outline-none text-xl font-mono flex-grow "
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                </div>
            </div>
        </div>
    );
};

export default TerminalDisplay;

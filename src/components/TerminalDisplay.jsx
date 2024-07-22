import React, { useState, useEffect, useRef } from 'react';
import '../components/TerminalDisplay.css'

const TerminalDisplay = () => {
    const [inputValue, setInputValue] = useState('');
    const [output, setOutput] = useState([]);
    const outputEndRef = useRef(null);

    const colorTerminal = ['red', 'yellow', 'green'];

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            processCommand(inputValue);
            setInputValue('');
        }
    };

    const processCommand = (command) => {
        const newOutput = [...output, { type: 'command', text: `$ ${command}` }];
        switch (command.toLowerCase()) {
            case 'help':
                newOutput.push(
                    { type: 'output', text: "Currently this app is under development so stay tuned! More commands will be activated soon. For more details, check out ", link: "https://shriyash.vercel.app" },
                    { type: 'output', text: "this is another line" }
                );
                break;
            case 'portfolio':
                newOutput.push(
                    { type: 'output', text: "This is my portfolio link ", link: "https://shriyash.vercel.app" }
                );
                break;
            case 'clear':
                setOutput([]);
                return;
            default:
                newOutput.push({ type: 'output', text: `command not found: ${command}` });
                break;
        }
        setOutput(newOutput);
    };

    useEffect(() => {
        outputEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [output]);

    return (
        <div className='w-full h-screen m-3 rounded-2xl bg-gray-800 p-0 shadow-2xl shadow-black flex flex-col'>
            <div className='bg-gray-900 p-4 rounded-t-2xl flex flex-row items-center justify-between'>
                <div className='flex flex-row items-center'>
                    {colorTerminal.map((color, index) => (
                        <div
                            key={index}
                            className={`h-3 w-3 rounded-full mx-1 ${color === 'green' ? 'animate-blink' : ''}`}
                            style={{ background: color }}
                        ></div>
                    ))}
                </div>
                <div className='font-bold text-blue-400 px-4 text-sm'>
                    <h2>WebReich Terminal</h2>
                </div>
            </div>
            <div className='p-4 flex-grow overflow-y-auto'>
                <h3 className='text-gray-500 font-semibold pb-3 text-sm'>To see all commands, type help</h3>
                {output.map((line, index) => (
                    <div key={index} className='text-slate-200 text-sm font-mono'>
                        {line.type === 'command' ? (
                            <span className='font-bold text-lg'>{line.text}</span>
                        ) : (
                            <span>
                                {line.text} {line.link && <a href={line.link} target='_blank' rel='noopener noreferrer' className='text-blue-400 underline'>{line.link}</a>}
                            </span>
                        )}
                        <br />
                    </div>
                ))}
                <div ref={outputEndRef}></div>
                <div className='flex'>
                    <span className='text-yellow-500 text-xl font-mono'>~ </span>
                    <input
                        type="text"
                        className="bg-gray-800 text-red-400 border-none outline-none text-sm font-mono flex-grow"
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

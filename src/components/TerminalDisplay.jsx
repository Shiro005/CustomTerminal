// src/components/TerminalDisplay.js
import React, { useState, useEffect, useRef } from 'react';
import '../components/TerminalDisplay.css';
import { commands } from '../commands';

const TerminalDisplay = () => {
    const [inputValue, setInputValue] = useState('');
    const [output, setOutput] = useState([]);
    const outputEndRef = useRef(null);

    const colorTerminal = ['red', 'yellow', 'green'];

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            await processCommand(inputValue);
            setInputValue('');
        }
    };

    const processCommand = async (commandInput) => {
        const [command, ...args] = commandInput.split(' ');
        const commandFunction = commands[command.toLowerCase()] || commands.default;

        let newOutput = [...output, { type: 'command', text: `$ ${commandInput}` }];
        if (commandFunction) {
            if (command.toLowerCase() === 'clear') {
                commandFunction(setOutput);
            } else {
                const commandOutput = await commandFunction(args.join(' '));
                newOutput = [...newOutput, ...commandOutput];
                setOutput(newOutput);
            }
        }
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
                <div className='text-blue-400 px-4 font-bold customStyle-font-cursive'>
                    <h1>Terminal</h1>
                </div>
            </div>
            <div className='p-4 flex-grow overflow-y-auto'>
                <h3 className='text-gray-500 font-semibold pb-3 text-md custom-font-style'>To see all commands, type help</h3>
                {output.map((line, index) => (
                    <div key={index} className='text-slate-200 text-md font-mono custom-font-style'>
                        {line.type === 'command' ? (
                            <span className='text-md custom-font-style text-blue-400'>{line.text}</span>
                        ) : (
                            <span>
                                {line.text} {line.link && <a href={line.link} target='_blank' rel='noopener noreferrer' className='text-blue-400 underline custom-font-style text-sm'>{line.link}</a>}
                            </span>
                        )}
                        <br />
                    </div>
                ))}
                <div ref={outputEndRef}></div>
                <div className='flex'>
                    <span className='text-blue-400 text-md font-mono'>~ </span>
                    <input
                        type="text"
                        className="bg-gray-800 text-blue-400 border-none outline-none text-md flex-grow custom-font-style "
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

// src/commands.js
export const commands = {
    help: () => {
        return [
            { type: 'output', text: "Currently this app is under development so stay tuned! More commands will be activated soon. For more details, check out ", link: "https://shriyash.vercel.app" },
            { type: 'output', text: "Commands available:" },
            { type: 'output', text: "help - Display this help message." },
            { type: 'output', text: "portfolio - Display portfolio link." },
            { type: 'output', text: "github <username> - Fetch GitHub profile data of the specified user." },
            { type: 'output', text: "clear - Clear the terminal output." },
            { type: 'output', text: "echo <message> - Display the message." },
            { type: 'output', text: "date - Display the current date and time." },
            { type: 'output', text: "whoami - Display the current user." },
        ];
    },
    portfolio: () => {
        return [
            { type: 'output', text: "This is my portfolio link ", link: "https://shriyash.vercel.app" }
        ];
    },
    github: async (username) => {
        if (!username) {
            return [{ type: 'output', text: "Please provide a GitHub username." }];
        }

        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
            return [{ type: 'output', text: `Failed to fetch GitHub data for ${username}.` }];
        }

        const data = await response.json();
        return [
            { type: 'output', text: `GitHub Profile of ${data.login}` },
            { type: 'output', text: `Name: ${data.name}` },
            { type: 'output', text: `Bio: ${data.bio}` },
            { type: 'output', text: `Public Repos: ${data.public_repos}` },
            { type: 'output', text: `Followers: ${data.followers}` },
            { type: 'output', text: `Following: ${data.following}` },
            { type: 'output', text: "Profile Image: ", link: data.avatar_url }
        ];
    },
    clear: (setOutput) => {
        setOutput([]);
        return [];
    },
    echo: (message) => {
        return [{ type: 'output', text: message }];
    },
    date: () => {
        const now = new Date();
        return [{ type: 'output', text: now.toString() }];
    },
    whoami: () => {
        return [{ type: 'output', text: "User" }];
    },
    default: (command) => {
        return [{ type: 'output', text: `command not found: ${command}` }];
    }
};

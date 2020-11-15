const stateChart = {
    init: {
        first: "",
        defaultState: "firstHelp",
        changes: [
        ]
    },
    firstHelp: {
        first: "Hi Bob! Can I help?",
        defaultState: "help",
        timeoutState: "help",
        timeout: 60,
        changes: [
            {
                pattern: "project|manager",
                newState: "manager"
            },
            {
                pattern: "digital|media|specialist",
                newState: "helpdesk"
            },
            {
                pattern: "help",
                newState: "help"
            },
            {
                pattern: "alice",
                newState: "alice"
            },
            {
                pattern: "staff|people",
                newState: "nextHelp2"
            },
            {
                pattern: "ratio|stats",
                newState: "ratio"
            },
            {
                pattern: "weather|waether",
                newState: "weather"
            },
            {
                pattern: "james",
                newState: "james"
            },
            {
                pattern: "abdur",
                newState: "abdur"
            },
            {
                pattern: "nisar",
                newState: "nisar"
            },
            {
                pattern: "bye|go away|end chat",
                newState: "end"
            }
        ]
    },
    weather: {
        first: "It's a glorious day today!",
        defaultState: "firstHelp",
        timeoutState: "firstHelp",
        timeout: 2,
        changes: [
            {
                pattern: "project|manager",
                newState: "manager"
            },
            {
                pattern: "digital|media|specialist",
                newState: "helpdesk"
            },
            {
                pattern: "help",
                newState: "help"
            }
        ]
    },
    ratio: {
        first: `These are your stats: <ul>
                <li>57% – Source of hire.
                <li>50% – Time to hire.
                <li>42% – Applicants per hire.
                <li>41% – Cost per hire.
                <li>41% – Candidate experience.
                <li>38% – Retention.
                <li>37% – Offer acceptance per hire.
                <li>36% – Quality of hire.</ul>`,
        defaultState: "firstHelp",
        timeoutState: "weather",
        timeout: 10,
        parentChart: "firstHelp",
        changes: [
        ]
    },
    alice: {
        first: "Alice is on holiday! She's due back in 2 days.",
        defaultState: "firstHelp",
        timeoutState: "firstHelp",
        timeout: 30,
        parentChart: "firstHelp",
        changes: [
        ]
    },
    abdur: {
        first: "Abdur's an amazing developer.",
        defaultState: "firstHelp",
        timeoutState: "firstHelp",
        timeout: 3,
        parentChart: "firstHelp",
        changes: [
        ]
    },
    james: {
        first: "James created this mockBot.",
        defaultState: "firstHelp",
        timeoutState: "firstHelp",
        timeout: 3,
        parentChart: "firstHelp",
        changes: [
        ]
    },
    nisar: {
        first: "Nisar is an amazing Project Manager.",
        defaultState: "firstHelp",
        timeoutState: "firstHelp",
        timeout: 3,
        parentChart: "firstHelp",
        changes: [
        ]
    },
    nextHelp: {
        first: `Don't forget Alice is back in 2 days. Let me know if you 
        need to know about the status of other team members. <br>Or maybe 
        you need to know your performance rations`,
        defaultState: "firstHelp",
        timeoutState: "nextHelp2",
        parentChart: "firstHelp",
        timeout: 20,
        changes: [
            {
                pattern: "performance|ratio|stats|my",
                newState: "ratio"
            }
        ]
    },
    nextHelp2: {
        first: "You can ask about Alice, James, Abdur or Nisar for example",
        defaultState: "firstHelp",
        timeoutState: "firstHelp",
        parentChart: "firstHelp",
        timeout: 20,
        changes: [
            {
                pattern: "james",
                newState: "james"
            },
            {
                pattern: "abdur",
                newState: "abdur"
            },
            {
                pattern: "nisar",
                newState: "nisar"
            },
            {
                pattern: "alice",
                newState: "alice"
            },
            {
                pattern: "j",
                newState: "james"
            },
            {
                pattern: "n",
                newState: "nisar"
            }
        ]
    },
    manager: {
        first: "The 'Project Manager' position has been in progress for 12 days.<br>You might consider getting help from a specialist in 'Offshore Structural Project Management?', such as Alice?",
        defaultState: "help",
        changes: [
            {
                pattern: "thanks",
                newState: "end"
            }
        ]
    },
    helpdesk: {
        first: "The 'Digital Media Specialist' position has been in progress for 3 days.<br>You probably need to look at more CVs",
        defaultState: "help",
        changes: [
            {
                pattern: "thanks",
                newState: "end"
            }
        ]
    },
    help: {
        first: "You only have two positions in progress. That's good. Is one causing problems: the 'Project Manager' position or the 'Digital Media Specialist' position?",
        defaultState: "firstHelp",
        timeoutState: "nextHelp",
        timeout: 30,
        parentChart: "firstHelp",
        changes: [
            {
                pattern: "project|manager",
                newState: "manager"
            },
            {
                pattern: "digital|media|specialist",
                newState: "helpdesk"
            }
        ]
    },
    helpBothPos: {
        first: "The 'Project Manager' position or the 'Digital Media Specialist' position have been in progress for 12 and 3 days respectively. If there's a problem you could talk to your manager; you have had a slack chat for 19 days.",
        defaultState: "firstHelp",
        timeoutState: "firstHelp",
        timeout: 15,
        parentChart: "firstHelp",
        changes: [
            {
                pattern: "manager",
                newState: "manager"
            },
            {
                pattern: "digital|media|specialist",
                newState: "helpdesk"
            }
        ]
    },
    end: {
        first: "Have a nice day. Bye Bye!",
        defaultState: "end",
        changes: [
        ]
    }
}

export default stateChart
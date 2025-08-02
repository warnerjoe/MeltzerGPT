document.addEventListener('DOMContentLoaded', function() {
    const askButton = document.getElementById('askButton');
    const wrestlerOne = document.getElementById('wrestlerOne');
    const wrestlerTwo = document.getElementById('wrestlerTwo');
    const matchGimmick = document.getElementById('matchGimmick');
    const authorStyle = document.getElementById('authorStyle');
    const answerDiv = document.getElementById('answerDiv');
    const copyButton = document.getElementById('copyButton');
    const autocompleteDropdown = document.getElementById('autocompleteDropdown');
    
    // View management elements
    const inputView = document.getElementById('input-view');
    const resultsView = document.getElementById('results-view');
    const newMatchBtn = document.getElementById('newMatchBtn');
    const backToResultsBtn = document.getElementById('backToResultsBtn');
    
    // Track if we have generated results
    let hasGeneratedMatch = false;

    function getStyleInstruction() {
        const selectedStyle = authorStyle.value;
        
        const styleInstructions = {
            'wrestling-journalist': 'Write in the tone of a professional wrestling blogger and journalist.',
            'shakespeare': 'Write in the style of William Shakespeare with eloquent Elizabethan language, "thee" and "thou", poetic flourishes, and dramatic metaphors.',
            'edgar-allan-poe': 'Write in the dark, gothic style of Edgar Allan Poe with mysterious atmosphere, dramatic tension, and haunting descriptions.',
            'mark-twain': 'Write in the witty, folksy style of Mark Twain with humor, colloquial language, and keen social observations.',
            'charles-dickens': 'Write in the verbose, descriptive style of Charles Dickens with rich character details and social commentary.',
            'ernest-hemingway': 'Write in the concise, understated style of Ernest Hemingway with short sentences and subtle emotion.',
            'jane-austen': 'Write in the refined, witty style of Jane Austen with social observations and gentle satire.',
            'dr-seuss': 'Write in the playful, rhyming style of Dr. Seuss with whimsical language and creative wordplay.',
            'hunter-s-thompson': 'Write in the gonzo journalism style of Hunter S. Thompson with wild energy, stream-of-consciousness, and counter-culture references.',
            'morgan-freeman': 'Write as if Morgan Freeman is narrating, with his calm, wise, and philosophical tone.',
            'david-attenborough': 'Write as if documenting wildlife for a nature documentary, treating wrestlers as fascinating creatures in their natural habitat.',
            'gordon-ramsay': 'Write in the passionate, intense style of Gordon Ramsay with dramatic emphasis and cooking metaphors.'
        };
        
        return styleInstructions[selectedStyle] || styleInstructions['wrestling-journalist'];
    }

    function generatePrompt() {
        return `
            I already have an HTML container with an ID of right-side, and I need you to create its innerHTML.
            I want to create a review for a professional wrestling match between ${wrestlerOne.value} and ${wrestlerTwo.value}.  
            The gimmick of this wrestling match will be ${matchGimmick.value}.
            
            WRITING STYLE: ${getStyleInstruction()} 
            The review will give a star rating from 0 to 5 stars, in .25 star increments.  
            Most matches should be 2 or 3 stars, but on very rare occasions more.
            
            It should be five very detailed paragraphs.  
            Center all of the text horizontally.
            Make sure all paragraphs reflect the rules of the ${matchGimmick.value} match.
            The first paragraph will recap why the two wrestlers are fighting. 
            The next three paragraphs will give a recap of the beginning, middle, and end of the match. 
            Specify how the match ends including the final move of the match.  
            These should be detailed, contain descriptions of high points of the match, and be unopinionated.
            The last paragraph will be the reviewer's opinion of the match.  
            It will reflect the star rating and should be very opinionated.
            
            In HTML, I need an H1 containing a creative headline based on the match that does not contain the wrestlers' names.
            An H4 with no label that is in the format of ${wrestlerOne.value} vs. ${wrestlerTwo.value}.
            Five black Font-Awesome star icons.  
            They should reflect the star rating from the review, and if the rating is less than 5, any excess stars should be empty.
            An H6 containing Star Rating: Numeric Value.
            
            Five paragraphs containing the review of the match.  
            None of the paragraphs should have labels.  They should all be detailed and contain at least 5 sentences.
            An H3 displaying who won the match with the structure Winner: Name.
            
            All of the contents should be centered horizontally and have word wrap.
            
            IMPORTANT: Return ONLY the HTML content. Do not include any explanatory text, greetings, or meta-commentary like "Sure, here is..." or "Here's the HTML...". Start directly with the HTML tags and end with the closing HTML tags. No markdown formatting, no code blocks, just pure HTML.
        `;
    }

    askButton.addEventListener('click', function() {
        const prompt = generatePrompt();
        
        // Add loading state
        askButton.disabled = true;
        askButton.innerHTML = 'GENERATING MATCH...';
        askButton.classList.add('loading');
        answerDiv.innerHTML = '<div class="loading-spinner"><div class="spinner"></div><p>Creating your epic match review...</p></div>';
        
        // Add CSS for spinner
        if (!document.getElementById('spinner-styles')) {
            const style = document.createElement('style');
            style.id = 'spinner-styles';
            style.textContent = `
                .loading-spinner {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 300px;
                }
                .spinner {
                    width: 60px;
                    height: 60px;
                    border: 5px solid rgba(255, 215, 0, 0.3);
                    border-top: 5px solid var(--primary-gold);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .loading-spinner p {
                    margin-top: 20px;
                    color: var(--primary-gold);
                    font-size: 1.8rem;
                    font-style: italic;
                }
            `;
            document.head.appendChild(style);
        }

        fetch('/api/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: prompt })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Received data:', data);
            answerDiv.innerHTML = data.message;
            
            // Mark that we have generated a match
            hasGeneratedMatch = true;
            backToResultsBtn.disabled = false;
            
            // Switch to results view
            showResultsView();
            
            // Animate the content appearance
            answerDiv.style.opacity = '0';
            setTimeout(() => {
                answerDiv.style.transition = 'opacity 0.5s ease-in';
                answerDiv.style.opacity = '1';
            }, 100);
        })
        .catch(error => {
            console.error('Error:', error);
            answerDiv.innerHTML = `<div style="color: var(--red-accent); text-align: center; font-size: 1.8rem;">
                <p>Failed to generate match review!</p>
                <p style="font-size: 1.4rem; margin-top: 1rem;">${error.message}</p>
            </div>`;
        })
        .finally(() => {
            // Reset button state
            askButton.disabled = false;
            askButton.innerHTML = 'SUBMIT';
            askButton.classList.remove('loading');
        });
    });

    copyButton.addEventListener('click', function() {
        if (answerDiv.textContent) {
            navigator.clipboard.writeText(answerDiv.textContent)
                .then(() => {
                    console.log('Text copied to clipboard');
                })
                .catch(err => {
                    console.error('Error in copying text: ', err);
                });
        }
    });

    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.parentNode.classList.add('active');
        }
    });

    // Function to handle autocomplete logic
async function handleAutocomplete(inputElement, dropdownElement) {
    const inputValue = inputElement.value;
    
    try {
        const response = await fetch(`/searchone?ringName=${encodeURIComponent(inputValue)}`);
        const data = await response.json();
        
        dropdownElement.innerHTML = ''; // Clear previous autocomplete suggestions
        
        if (data.length > 0) {
            dropdownElement.style.display = 'block'; // Show dropdown only when there are suggestions
            data.forEach(wrestler => {
                const link = document.createElement('a');
                link.href = '#';
                link.classList.add('autocomplete-link');
                link.textContent = wrestler.ringName;
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    inputElement.value = wrestler.ringName;
                    dropdownElement.style.display = 'none';
                });
                dropdownElement.appendChild(link);
            });
        } else {
            dropdownElement.style.display = 'none'; // Hide dropdown when there are no suggestions
        }
    } catch (error) {
        console.error(error);
        // Handle error
    }
}

// Event listener for wrestlerOne input
wrestlerOne.addEventListener('input', async function() {
    await handleAutocomplete(this, autocompleteDropdown);
});

// Event listener for wrestlerTwo input
wrestlerTwo.addEventListener('input', async function() {
    await handleAutocomplete(this, autocompleteDropdownTwo);
});

    autocompleteDropdown.addEventListener('click', function(event) {
        if (event.target.tagName === 'A') {
            const selectedName = event.target.textContent;
            wrestlerOne.value = selectedName;
            autocompleteDropdown.style.display = 'none';
        }
    });
    
    // View switching functions
    function showInputView() {
        inputView.classList.add('active');
        resultsView.classList.remove('active');
    }
    
    function showResultsView() {
        inputView.classList.remove('active');
        resultsView.classList.add('active');
    }
    
    // View switching event handlers
    newMatchBtn.addEventListener('click', function() {
        showInputView();
    });
    
    backToResultsBtn.addEventListener('click', function() {
        if (hasGeneratedMatch) {
            showResultsView();
        }
    });
});
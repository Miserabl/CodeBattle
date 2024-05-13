import React, { useEffect, useState } from 'react';
import './BattlePage.css';
import { useNavigate } from 'react-router-dom';

const CodingChallenge = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isWaiting, setIsWaiting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = () => {
        setIsWaiting(true);
        sendMessageToServerlet();
    };

    const sendMessageToServerlet = async () => {
        const code = encodeURIComponent(document.getElementById('code-editor').value);
        const email = sessionStorage.getItem('email');
        try {
          const response = await fetch(`http://localhost:8080/LeetcodeBattleBackend/runCode?code=${code}&email=${email}`, {
            method: 'GET',
            headers: {'Content-Type': 'text/plain'}
          });
    
          if (!response.ok) {
            throw new Error('Failed to send message to serverlet');
          }
          
          const responseData = await response.text().then(text => parseFloat(text.trim()));
          console.log(JSON.stringify(responseData));
          // Assuming responseData includes the number to pass
          navigate('/winloss', { state: { number: responseData } });  // Use navigate to go to /winloss with number
        } catch (error) {
          console.error('Error sending message to serverlet:', error);
        }
    };

    const number = parseInt(new URLSearchParams(window.location.search).get('number'));

    let requestSent = false;

    useEffect(() => {
        if (requestSent) return;

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8080/LeetcodeBattleBackend/runCode", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log('Number sent to servlet successfully');
                } else {
                    console.error('Error sending number to servlet:', xhr.status);
                }
            }
        };
        xhr.send("number=" + number);
        requestSent = true;

    }, []); 

    return (
        <div className="container-main">
            <div className="left-panel">
                <div className="problem-description">
                    <h2>Problem Description</h2>
                    <h3>Two Sum</h3>
                    <p>Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
                        You may assume that each input would have exactly one solution, and you may not use the same element twice.
                        You can return the answer in any order.
                    </p>
                </div>
            </div>
            <div className="right-panel">
                <textarea
                    id="code-editor"
                    style={{ width: '100%', height: '250px', fontSize: '16px', padding: '10px' }}
                    defaultValue="solution(input, target)"
                ></textarea>
                <button style={{ width: '100px', margin: '10px', fontSize: '16px' }} onClick={handleSubmit}>Submit</button>
            </div>
            <div
                id="waiting"
                style={{
                    display: isWaiting ? 'block' : 'none',
                    position: 'fixed',
                    bottom: 100,
                    width: '100%',
                    textAlign: 'center',
                    marginLeft: 100,
                    padding: '10px',
                    color: 'white',
                    fontSize: '32px',
                    textColor: "white",
                }}
            >
            <p className='waiting'>Waiting for opponent...</p>
            </div>
        </div>
    );
};

export default CodingChallenge;

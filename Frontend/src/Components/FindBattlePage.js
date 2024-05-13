import React, { useState } from 'react';
import './FindBattlePage.css'; // Assuming CSS for the card is also in this file
import battleImage from '../Assets/codebattle_Logo.jpg';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FindBattlePage = () => {
  let navigate = useNavigate();
  const [findingOpponent, setFindingOpponent] = useState(false);
  const [statistics, setStatistics] = useState({
    totalGames: 10,
    wins: 7,
    losses: 3,
    winRate: 70
  });



  useEffect(() => {
    const fetchStats = async () => {
      const email = sessionStorage.getItem('email');
      if (!email) {
        console.error("No email found in session storage");
        return;
      }
      try {
        const response = await fetch(`http://localhost:8080/LeetcodeBattleBackend/showStats?email=${encodeURIComponent(email)}`, {
          method: 'GET'
        });
        if (!response.ok) {
          throw new Error('Failed to fetch statistics');
        }
        const data = await response.json(); // Assuming the response is in JSON format
        setStatistics({
          totalGames: data.wins + data.losses,
          wins: data.wins,
          losses: data.losses,
          winRate: ((data.wins / (data.wins + data.losses)) * 100)
        });
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStats();
  }, []);



  const handleClick = () => {
    sendMessageToServerlet();
  };

  const sendMessageToServerlet = async () => {
    try {
      setFindingOpponent(true);
      const response = await fetch('http://localhost:8080/LeetcodeBattleBackend/findbattle', {
        method: 'POST',
        body: JSON.stringify({ message: 'Your message content' }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to send message to serverlet');
      }
      
      const responseData = await response.text();
      //console.log(responseData);
      console.log(JSON.stringify(responseData))
      if (responseData === "Starting Battle...\n") {
        window.location.href = '/battle?number=' + 0;
      }

      
    } catch (error) {
      throw new Error('Error sending message to serverlet:', error);
    }
  };

  
  return (
    <div>
    <div>
    <h1>Statistics</h1>
    </div>
    
    <div className="container-main">
      <div className="product-card">
        {/* Product Card */}
        <div className="card">
          <div className="image_container">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="image">
              <path
                d="M20 5H4V19L13.2923 9.70649C13.6828 9.31595 14.3159 9.31591 14.7065 9.70641L20 15.0104V5ZM2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"
              />
            </svg>
          </div>
          <div className="title">
            <span>Two sum</span>
          </div>
          <div className="size">
            <span>Difficulty level</span>
            <ul className="list-size">
              <li className="item-list"><button className="item-list-button">Easy</button></li>
            </ul>
          </div>
          <div className="action">
          {/* <button className="find-battle-btn" onClick={() => navigate('/battle')}>Find Battle</button> */}
            <button className="cart-button find-battle-btn" onClick={handleClick}>
              <svg className="cart-icon" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
              <span>Start Game</span>
            </button>
          </div>
        </div>
      </div>
      <div className="product-card">
        {/* Product Card */}
        <div className="card">
          <div className="image_container">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="image">
              <path
                d="M20 5H4V19L13.2923 9.70649C13.6828 9.31595 14.3159 9.31591 14.7065 9.70641L20 15.0104V5ZM2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"
              />
            </svg>
          </div>
          <div className="title">
            <span>Palindrome Number</span>
          </div>
          <div className="size">
            <span>Difficulty level</span>
            <ul className="list-size">
              <li className="item-list"><button className="item-list-button">Hard</button></li>
            </ul>
          </div>
          <div className="action">
          {/* <button className="find-battle-btn" onClick={() => navigate('/battle')}>Find Battle</button> */}
            <button className="cart-button find-battle-btn" onClick={() => navigate('/battle')}>
              <svg className="cart-icon" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
              <span>Start Game</span>
            </button>
          </div>
        </div>
      </div>
      <div className="product-card">
        {/* Product Card */}
        <div className="card">
          <div className="image_container">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="image">
              <path
                d="M20 5H4V19L13.2923 9.70649C13.6828 9.31595 14.3159 9.31591 14.7065 9.70641L20 15.0104V5ZM2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"
              />
            </svg>
          </div>
          <div className="title">
            <span>Reverse Integer</span>
          </div>
          <div className="size">
            <span>Difficulty level</span>
            <ul className="list-size">
              <li className="item-list"><button className="item-list-button">Medium</button></li>
            </ul>
          </div>
          <div className="action">
          {/* <button className="find-battle-btn" onClick={() => navigate('/battle')}>Find Battle</button> */}
            <button className="cart-button find-battle-btn" onClick={() => navigate('/battle')}>
              <svg className="cart-icon" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
              <span>Start Game</span>
            </button>
          </div>
        </div>
      </div>
      
      
    </div>
    <div className='statistics'>
        <h1>Statistics</h1>
        <div className="stats">
          <p>Total games played: {statistics.totalGames}</p>
          <p>Total wins: {statistics.wins}</p>
          <p>Total losses: {statistics.losses}</p>
          <p>Win rate: {statistics.winRate}%</p>
        </div>
        {findingOpponent && <div style={{ fontSize: '40px' }}>Finding opponent...</div>}
        
    </div>
    </div>
  );
}

export default FindBattlePage;

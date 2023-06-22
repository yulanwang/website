"use client"

import React from 'react';
import { BaseSyntheticEvent, useState } from "react";

import './Sock.css'

export default function Sock() {
    const {email, setEmail} = useState("")
    const handleChange = e => {
        setEmail(e.target.value)
    }

    return (
        <div className='sockContainer'>
            <div></div>
            <div className='formContainer'>
                <div className='text'>
                    <h3>Join our mailing list!</h3>
                    <p>Sign up to get the latest updates on Oasis, including application 
                        dates for both mentors and participants.
                    </p>
                </div>
                <div className='inputContainer'>
                    <h4>Enter your email:</h4>
                </div>
                <form 
                    className='emailInput'
                    onsubmit={e => {
                        e.preventDefault()
                        console.log(email)
                    }}
                >
                    <input
                        type="email"
                        value={email}
                        placeholder="oasisneu@gmail.com"
                        className='active'
                        onChange={handleChange}
                    />
                    <button
                        className='submitButton'
                        onclick={() => {
                            console.log(email)
                            // onsubmit={email}
                        }}
                    >
                        <h4>Submit</h4>
                    </button>
                 </form>
            </div>  
        </div>
    )
}
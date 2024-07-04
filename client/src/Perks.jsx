export default function Perks({ selected, onChange }) {
    function handleCbClick(ev) {
        const {checked, name} = ev.target;
        if (checked) {
            onChange([...selected, name]);
        }
        else {
            onChange([...selected.filter(selectedName => selectedName !== name)]);
        }
    }

    return ( 
        <>
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
                <input type="checkbox" checked ={selected.includes('wifi')} name="wifi" onChange={handleCbClick} />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                </svg>
                <span>Wifi</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
                <input type="checkbox" checked={selected.includes('parking')} name="parking" onChange={handleCbClick} />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>

                <span>Parking</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
                <input type="checkbox" checked={selected.includes('tv')}  name="tv" onChange={handleCbClick} />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
                </svg>
                <span>TV</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
                <input type="checkbox" checked={selected.includes('pets')} name="pets" onChange={handleCbClick} />
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-paw" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M14.7 13.5c-1.1 -2 -1.441 -2.5 -2.7 -2.5c-1.259 0 -1.736 .755 -2.836 2.747c-.942 1.703 -2.846 1.845 -3.321 3.291c-.097 .265 -.145 .677 -.143 .962c0 1.176 .787 2 1.8 2c1.259 0 3 -1 4.5 -1s3.241 1 4.5 1c1.013 0 1.8 -.823 1.8 -2c0 -.285 -.049 -.697 -.146 -.962c-.475 -1.451 -2.512 -1.835 -3.454 -3.538z" />
                    <path d="M20.188 8.082a1.039 1.039 0 0 0 -.406 -.082h-.015c-.735 .012 -1.56 .75 -1.993 1.866c-.519 1.335 -.28 2.7 .538 3.052c.129 .055 .267 .082 .406 .082c.739 0 1.575 -.742 2.011 -1.866c.516 -1.335 .273 -2.7 -.54 -3.052z" />
                    <path d="M9.474 9c.055 0 .109 0 .163 -.011c.944 -.128 1.533 -1.346 1.32 -2.722c-.203 -1.297 -1.047 -2.267 -1.932 -2.267c-.055 0 -.109 0 -.163 .011c-.944 .128 -1.533 1.346 -1.32 2.722c.204 1.293 1.048 2.267 1.933 2.267z" />
                    <path d="M16.456 6.733c.214 -1.376 -.375 -2.594 -1.32 -2.722a1.164 1.164 0 0 0 -.162 -.011c-.885 0 -1.728 .97 -1.93 2.267c-.214 1.376 .375 2.594 1.32 2.722c.054 .007 .108 .011 .162 .011c.885 0 1.73 -.974 1.93 -2.267z" />
                    <path d="M5.69 12.918c.816 -.352 1.054 -1.719 .536 -3.052c-.436 -1.124 -1.271 -1.866 -2.009 -1.866c-.14 0 -.277 .027 -.407 .082c-.816 .352 -1.054 1.719 -.536 3.052c.436 1.124 1.271 1.866 2.009 1.866c.14 0 .277 -.027 .407 -.082z" />
                </svg>
                <span>Pets</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
                <input type="checkbox" checked={selected.includes('entrance')} name="entrance" onChange={handleCbClick} />
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-door-enter" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M13 12v.01" />
                    <path d="M3 21h18" />
                    <path d="M5 21v-16a2 2 0 0 1 2 -2h6m4 10.5v7.5" />
                    <path d="M21 7h-7m3 -3l-3 3l3 3" />
                </svg>
                <span>Private Entrance</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
                <input type="checkbox" checked={selected.includes('kitchen')}  name="kitchen" onChange={handleCbClick} />
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-tools-kitchen-2" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M19 3v12h-5c-.023 -3.681 .184 -7.406 5 -12zm0 12v6h-1v-3m-10 -14v17m-3 -17v3a3 3 0 1 0 6 0v-3" />
                </svg>
                <span>Kitchen</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
                <input type="checkbox" checked={selected.includes('pool')} name="pool" onChange={handleCbClick} />
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pool" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M2 20a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1" />
                    <path d="M2 16a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1" />
                    <path d="M15 12v-7.5a1.5 1.5 0 0 1 3 0" />
                    <path d="M9 12v-7.5a1.5 1.5 0 0 0 -3 0" />
                    <path d="M15 5l-6 0" />
                    <path d="M9 10l6 0" />
                </svg>
                <span>Pool</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
                <input type="checkbox" checked={selected.includes('ac')} name="ac" onChange={handleCbClick} />
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-snowflake" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 4l2 1l2 -1" />
                    <path d="M12 2v6.5l3 1.72" />
                    <path d="M17.928 6.268l.134 2.232l1.866 1.232" />
                    <path d="M20.66 7l-5.629 3.25l.01 3.458" />
                    <path d="M19.928 14.268l-1.866 1.232l-.134 2.232" />
                    <path d="M20.66 17l-5.629 -3.25l-2.99 1.738" />
                    <path d="M14 20l-2 -1l-2 1" />
                    <path d="M12 22v-6.5l-3 -1.72" />
                    <path d="M6.072 17.732l-.134 -2.232l-1.866 -1.232" />
                    <path d="M3.34 17l5.629 -3.25l-.01 -3.458" />
                    <path d="M4.072 9.732l1.866 -1.232l.134 -2.232" />
                    <path d="M3.34 7l5.629 3.25l2.99 -1.738" />
                </svg>
                <span>Air Conditioner</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
                <input type="checkbox" checked={selected.includes('workspace')} name="workspace" onChange={handleCbClick} />
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-desk" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 6h18" />
                    <path d="M4 6v13" />
                    <path d="M20 19v-13" />
                    <path d="M4 10h16" />
                    <path d="M15 6v8a2 2 0 0 0 2 2h3" />
                </svg>
                <span>Workspace</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
                <input type="checkbox" checked={selected.includes('washer')} name="washer" onChange={handleCbClick} />
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-wash-machine" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 3m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
                    <path d="M12 14m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                    <path d="M8 6h.01" />
                    <path d="M11 6h.01" />
                    <path d="M14 6h2" />
                    <path d="M8 14c1.333 -.667 2.667 -.667 4 0c1.333 .667 2.667 .667 4 0" />
                </svg>
                <span>Washing Machine / Dryer</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
                <input type="checkbox" checked={selected.includes('grill')} name="grill" onChange={handleCbClick} />
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-grill" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M19 8h-14a6 6 0 0 0 6 6h2a6 6 0 0 0 6 -5.775l0 -.225z" />
                    <path d="M17 20a2 2 0 1 1 0 -4a2 2 0 0 1 0 4z" />
                    <path d="M15 14l1 2" />
                    <path d="M9 14l-3 6" />
                    <path d="M15 18h-8" />
                    <path d="M15 5v-1" />
                    <path d="M12 5v-1" />
                    <path d="M9 5v-1" />
                </svg>
                <span>Grill</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
                <input type="checkbox" checked={selected.includes('kayak')} name="kayak" onChange={handleCbClick} />
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-kayak" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M6.414 6.414a2 2 0 0 0 0 -2.828l-1.414 -1.414l-2.828 2.828l1.414 1.414a2 2 0 0 0 2.828 0z" />
                    <path d="M17.586 17.586a2 2 0 0 0 0 2.828l1.414 1.414l2.828 -2.828l-1.414 -1.414a2 2 0 0 0 -2.828 0z" />
                    <path d="M6.5 6.5l11 11" />
                    <path d="M22 2.5c-9.983 2.601 -17.627 7.952 -20 19.5c9.983 -2.601 17.627 -7.952 20 -19.5z" />
                    <path d="M6.5 12.5l5 5" />
                    <path d="M12.5 6.5l5 5" />
                </svg>
                <span>Kayak</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
                <input type="checkbox" checked={selected.includes('beach')} name="beach" onChange={handleCbClick} />
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-beach" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M17.553 16.75a7.5 7.5 0 0 0 -10.606 0" />
                    <path d="M18 3.804a6 6 0 0 0 -8.196 2.196l10.392 6a6 6 0 0 0 -2.196 -8.196z" />
                    <path d="M16.732 10c1.658 -2.87 2.225 -5.644 1.268 -6.196c-.957 -.552 -3.075 1.326 -4.732 4.196" />
                    <path d="M15 9l-3 5.196" />
                    <path d="M3 19.25a2.4 2.4 0 0 1 1 -.25a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 1 .25" />
                </svg>
                <span>Beach essentials (towels, umbrella, etc) </span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
                <input type="checkbox" checked={selected.includes('selfCheckIn')} name="selfCheckIn" onChange={handleCbClick} />
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-key" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M16.555 3.843l3.602 3.602a2.877 2.877 0 0 1 0 4.069l-2.643 2.643a2.877 2.877 0 0 1 -4.069 0l-.301 -.301l-6.558 6.558a2 2 0 0 1 -1.239 .578l-.175 .008h-1.172a1 1 0 0 1 -.993 -.883l-.007 -.117v-1.172a2 2 0 0 1 .467 -1.284l.119 -.13l.414 -.414h2v-2h2v-2l2.144 -2.144l-.301 -.301a2.877 2.877 0 0 1 0 -4.069l2.643 -2.643a2.877 2.877 0 0 1 4.069 0z" />
                    <path d="M15 9h.01" />
                </svg>
                <span>Self Check-In </span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
                <input type="checkbox" checked={selected.includes('ping-pong')} name="ping-pong" onChange={handleCbClick} />
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-ping-pong" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12.718 20.713a7.64 7.64 0 0 1 -7.48 -12.755l.72 -.72a7.643 7.643 0 0 1 9.105 -1.283l2.387 -2.345a2.08 2.08 0 0 1 3.057 2.815l-.116 .126l-2.346 2.387a7.644 7.644 0 0 1 -1.052 8.864" />
                    <path d="M14 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                    <path d="M9.3 5.3l9.4 9.4" />
                </svg>
                <span>Ping Pong Table </span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
                <input type="checkbox" checked={selected.includes('billard')} name="billard" onChange={handleCbClick} />
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-sport-billard" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 10m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0" />
                </svg>
                <span>Pool Table (Billard) </span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
                <input type="checkbox" checked={selected.includes('gym')} name="gym" onChange={handleCbClick} />
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-barbell" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M2 12h1" />
                    <path d="M6 8h-2a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h2" />
                    <path d="M6 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1z" />
                    <path d="M9 12h6" />
                    <path d="M15 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1z" />
                    <path d="M18 8h2a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-2" />
                    <path d="M22 12h-1" />
                </svg>
                <span>Gym </span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
                <input type="checkbox" checked={selected.includes('console')} name="console" onChange={handleCbClick} />
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-device-gamepad" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M2 6m0 2a2 2 0 0 1 2 -2h16a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-16a2 2 0 0 1 -2 -2z" />
                    <path d="M6 12h4m-2 -2v4" />
                    <path d="M15 11l0 .01" />
                    <path d="M18 13l0 .01" />
                </svg>
                <span>Video Games </span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
                <input type="checkbox" checked={selected.includes('backyard')} name="backyard" onChange={handleCbClick} />
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-flower" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                    <path d="M12 2a3 3 0 0 1 3 3c0 .562 -.259 1.442 -.776 2.64l-.724 1.36l1.76 -1.893c.499 -.6 .922 -1 1.27 -1.205a2.968 2.968 0 0 1 4.07 1.099a3.011 3.011 0 0 1 -1.09 4.098c-.374 .217 -.99 .396 -1.846 .535l-2.664 .366l2.4 .326c1 .145 1.698 .337 2.11 .576a3.011 3.011 0 0 1 1.09 4.098a2.968 2.968 0 0 1 -4.07 1.098c-.348 -.202 -.771 -.604 -1.27 -1.205l-1.76 -1.893l.724 1.36c.516 1.199 .776 2.079 .776 2.64a3 3 0 0 1 -6 0c0 -.562 .259 -1.442 .776 -2.64l.724 -1.36l-1.76 1.893c-.499 .601 -.922 1 -1.27 1.205a2.968 2.968 0 0 1 -4.07 -1.098a3.011 3.011 0 0 1 1.09 -4.098c.374 -.218 .99 -.396 1.846 -.536l2.664 -.366l-2.4 -.325c-1 -.145 -1.698 -.337 -2.11 -.576a3.011 3.011 0 0 1 -1.09 -4.099a2.968 2.968 0 0 1 4.07 -1.099c.348 .203 .771 .604 1.27 1.205l1.76 1.894c-1 -2.292 -1.5 -3.625 -1.5 -4a3 3 0 0 1 3 -3z" />
                </svg>
                <span>Backyard </span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center">
                <input type="checkbox" checked={selected.includes('cameras')} name="cameras" onChange={handleCbClick} />
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-video" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z" />
                    <path d="M3 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
                </svg>
                <span>Exterior security cameras </span>
            </label>
        </>
    );
}
import React from 'react';

function Subreddit({subreddit, onClick}) {
    return (
			<li>
                
                <button type='button' onClick={onClick}>
                    {subreddit.header_img && <img src={subreddit.header_img} alt='Subreddit header image'/>}
                    <b>{subreddit.display_name_prefixed}</b>
                    {subreddit.header_title && <p>{subreddit.header_title}</p>}
                </button>
			</li>
		);
}

export default Subreddit;
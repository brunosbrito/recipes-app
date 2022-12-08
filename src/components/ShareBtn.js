import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';

function ShareBtn() {
  const [btnCopy, setBtnCopy] = useState(false);
  const history = useHistory();
  const url = history.location.pathname;

  return (
    <div>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ () => {
          copy(`http://localhost:3000${url}`);
          setBtnCopy(true);
        } }
      >
        Share
      </button>
      {(btnCopy === true) && <p>Link copied!</p>}

    </div>

  );
}
export default ShareBtn;

import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory, useParams } from 'react-router-dom';

function ShareBtn() {
  const [btnCopy, setBtnCopy] = useState(false);
  const { id } = useParams();
  const history = useHistory();
  const url = history.location.pathname;

  return (
    <div>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ () => {
          copy((url.includes('meals')) ? `http://localhost:3000/meals/${id}` : `http://localhost:3000/drinks/${id}`);
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

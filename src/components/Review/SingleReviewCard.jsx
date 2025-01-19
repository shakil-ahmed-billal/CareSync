
import { Rating } from '@smastrom/react-rating';
import styled from 'styled-components';

const SingleReviewCard = ({ item }) => {

    const { name, review, photo, rating } = item || {}

    return (
        <StyledWrapper>
            <div className="card">
                <div className="img">
                    <img referrerPolicy='no-referrer' className='rounded-xl' src={photo} alt="" />
                </div>
                <div className="textBox">
                    <div className="textContent">
                        <p className="h1">{name}</p>
                        <span className="span"><Rating style={{ maxWidth: 80 }} value={rating} readOnly /></span>
                    </div>
                    <p className="p">{review}</p>
                    <div>
                    </div></div></div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .card {
    width: 100%;
    max-width: 290px;
    height: 70px;
    background: #353535;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: left;
    backdrop-filter: blur(10px);
    transition: 0.5s ease-in-out;
  }

  .card:hover {
    cursor: pointer;
    transform: scale(1.05);
  }

  .img {
    width: 50px;
    height: 50px;
    margin-left: 10px;
    border-radius: 10px;
  }

  .card:hover > .img {
    transition: 0.5s ease-in-out;
    background: linear-gradient(#9198e5, #712020);
  }

  .textBox {
    width: calc(100% - 90px);
    margin-left: 10px;
    color: white;
    font-family: 'Poppins' sans-serif;
  }

  .textContent {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .span {
    font-size: 10px;
  }

  .h1 {
    font-size: 16px;
    font-weight: bold;
  }

  .p {
    font-size: 12px;
    font-weight: lighter;
  }`;

export default SingleReviewCard;

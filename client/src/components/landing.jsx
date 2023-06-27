import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../styles/landing.css';

function Landing() {
  return (
    <>
      <div className='home-container'>
        <div className='home-container1'>
          <Link to='/'>
            <img
              style={{ height: '50px', margin: '10px' }}
              src={require('../motive-logo.jpg')}
              alt='logo'
            />
          </Link>
          <Link to='login'>
            <Button variant='warning' className='home-text login'>
              Log in
            </Button>
          </Link>
        </div>
        <div className='home-container2'>
          <h1 className='home-text1'>
            Your ✔️ tasks, 🗒️notes, projects, assignments, &amp; 🧑🏽‍🤝‍🧑🏽friends all
            in one place
          </h1>
          <span className='home-text2'>
            Motive is the connected workspace where better, faster work happens
          </span>
          <br />
          <Link to='/register'>
            <Button variant='primary' className='home-button button'>
              Register
            </Button>
          </Link>
        </div>
        <img
          alt='productivity'
          src='https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDd8fHByb2R1Y3Rpdml0eXxlbnwwfHx8fDE2ODI2NzM1OTI&amp;ixlib=rb-4.0.3&amp;w=700'
          className='home-image1'
        />
        <span className='home-text3'>Finally, all your work in one place</span>
        <span className='home-text4'>Motive Labs, Inc</span>
      </div>
      <style jsx>
        {`
          .home-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: flex-start;
            padding-top: var(--dl-space-space-unit);
            padding-left: var(--dl-space-space-unit);
            padding-right: var(--dl-space-space-unit);
            flex-direction: column;
            padding-bottom: var(--dl-space-space-unit);
            justify-content: flex-start;
            background-color: #f5f5f5;
          }
          .home-container1 {
            flex: 0 0 auto;
            width: 100%;
            height: 100px;
            display: flex;
            position: relative;
            align-items: center;
            justify-content: flex-start;
          }
          .home-image {
            width: 148px;
            height: 55px;
            object-fit: cover;
          }
          .home-text {
            font-style: normal;
            font-weight: 600;
          }
          .home-container2 {
            flex: 0 0 auto;
            width: 100%;
            height: 445px;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .home-text1 {
            color: rgb(64, 98, 103);
            width: 508px;
            height: 143px;
            text-align: center;
            margin-top: -30px;
          }
          .home-text2 {
            padding: 20px;
            box-shadow: rgb(212, 212, 212) 5px 5px 10px 0px;
            padding-left: 20px;
            padding-right: 29px;
            padding-bottom: 20px;
            text-transform: capitalize;
            margin-top: 30px;
          }
          .home-button {
            margin-top: 10px;
          }
          .home-image1 {
            width: 666px;
            height: 340px;
            align-self: center;
            margin-top: -50px;
            object-fit: cover;
          }
          .home-text3 {
            align-self: center;
            margin-top: 20px;
            margin-bottom: 20px;
          }
          .home-text4 {
            align-self: right;
            margin-top: 0px;
            margin-bottom: 10px;
            margin-left: 10px;
          }
          .login {
            margin-left: 80%;
            position: absolute;
            width: 100px;
            height: 40px;
          }
        `}
      </style>
    </>
  );
}

export default Landing;

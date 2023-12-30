import React from 'react'
import html2pdf from 'html2pdf.js';
import saveAs from 'file-saver';
import logo from '../Components/img/logo.png'
import { useLocation } from 'react-router-dom';

function RegistrationReceipt() {

  const location  = useLocation()

  const {data} = location.state

  console.log('data =', data)

  const generatePdf = () => {
    const content = document.getElementById('element'); 
    html2pdf(content);
  };
      

  return (
    <>
    <div id="element">
  <div id="invoice-POS">
    <center id="top">
      <img src={logo}/>
      <div className="info">
        <h2>Uncodemy</h2>
      </div>
     
    </center>
  
    <div id="mid">
      <div className="info">
        <h2>Contact Info</h2>
        <h6>
          Address : B 14-15, Udhyog Marg, Block B, Sector 1, Noida, Uttar Pradesh 201301
          {/* <br />
          Email : JohnDoe@gmail.com */}
          <br />
          Phone : 77019 28515
          <br />
        </h6>
      </div>

      <h1 className='heading'>Registration Detail</h1>

    </div>

    
  
    <div id="bot">
      <div id="table">
        <table>
          <tbody>
           
            <tr className="service">
              <td className="tableitem">
                <h6 className="itemtext">Registration No.</h6>
              </td>
             
              <td className="tableitem">
                <h6 className="itemtext">{data.RegistrationNo}</h6>
              </td>
            </tr>
            <tr className="service">
              <td className="tableitem">
                <h6 className="itemtext">Name</h6>
              </td>
             
              <td className="tableitem">
                <h6 className="itemtext">{data.Name}</h6>
              </td>
            </tr>
            <tr className="service">
              <td className="tableitem">
                <h6 className="itemtext">Mobile</h6>
              </td>
              
              <td className="tableitem">
                <h6 className="itemtext">{data.Number}</h6>
              </td>
            </tr>
            <tr className="service">
              <td className="tableitem">
                <h6 className="itemtext">Course</h6>
              </td>
             
              <td className="tableitem">
                <h6 className="itemtext">{data.Course}</h6>
              </td>
            </tr>
            <tr className="service">
              <td className="tableitem">
                <h6 className="itemtext">Payment Method</h6>
              </td>
             
              <td className="tableitem">
                <h6 className="itemtext">{data.PaymentMethod}</h6>
              </td>
            </tr>
            <tr className="service">
              <td className="tableitem">
                <h6 className="itemtext">Course Fees</h6>
              </td>
             
              <td className="tableitem">
                <h6 className="itemtext">{data.CourseFees}</h6>
              </td>
            </tr>

            <tr className="service">
              <td className="tableitem">
                <h6 className="itemtext">Registration Fees</h6>
              </td>
             
              <td className="tableitem">
                <h6 className="itemtext">{data.RegistrationFees}</h6>
              </td>
            </tr>
            <tr className="service">
              <td className="tableitem">
                <h6 className="itemtext">Registration Date</h6>
              </td>
             
              <td className="tableitem">
                <h6 className="itemtext">{data.RegistrationDate}</h6>
              </td>
            </tr>
            <tr className="service">
              <td className="tableitem">
                <h6 className="itemtext">Payment Mode</h6>
              </td>
             
              <td className="tableitem">
                <h6 className="itemtext">{data.PaymentMode}</h6>
              </td>
            </tr>
            <tr className="service">
              <td className="tableitem">
                <h6 className="itemtext">Batch Join</h6>
              </td>
             
              <td className="tableitem">
                <h6 className="itemtext">{data.joinDate} {data.joinTime}</h6>
              </td>
            </tr>
            <tr className="service">
              <td className="tableitem">
                <h6 className="itemtext">Counselor</h6>
              </td>
             
              <td className="tableitem">
                <h6 className="itemtext">{data.Counselor}</h6>
              </td>
            </tr>
           
          </tbody>
        </table>
      </div>

      <div className='signature-section'>
        <h2>Authorised Signature</h2>
        <h2>Student Signature</h2>
      </div>
    
      <div id="legalcopy">
        <h6 className="legal">
          <strong>Note : </strong>&nbsp; Your Payment due within 3 days after your Registration.
        </h6>
      </div>
    </div>

  </div>

    </div>
    <div className="text-center"><button className="btn btn-primary" onClick={generatePdf}>Download Receipt</button></div>

</>

  )
}

export default RegistrationReceipt
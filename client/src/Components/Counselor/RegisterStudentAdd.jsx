import React, { useState, useEffect, useContext } from "react";
import { StudentContext } from "../../context/StudentState";
import Cslidebar from "./Cslidebar";
import { useParams,useLocation, useNavigate } from 'react-router-dom';
import Header from "../Header";
import Swal from 'sweetalert2'
import { HashLoader } from "react-spinners";

const RegisterStudentAdd = () => {

  let navigate  = useNavigate()

  const [allcourse, setAllCourse] = useState();
  const [trainer, setTrainer] = useState();
  const [course, setCourse] = useState();
  const [methodStatus, setMethodStatus] = useState()
  const [allFieldStatus, setAllFieldStatus] = useState(false)
  const [counselor, setCounselor] = useState()
  // const location = useLocation();
  // const { counselor } = location.state;

  let ContextValue = useContext(StudentContext);
 
  useEffect(() => {

    getAllCourse();
    getTrainer()
    getCounselor()
    
  }, []);

  const getCounselor = async()=>{
    const counsellor = await ContextValue.getAllCounselor()
    setCounselor(counsellor.counselorData)
    console.log('counselor all =',counsellor.counselorData)
  }

  // const getAllCourse = async () => {
  //   let allCourse = await ContextValue.getAllBatchCourse();
  //   console.log("course =", allCourse.batchCourse[0].Course);
  //   setAllCourse(allCourse.batchCourse[0].Course);
  // };

  const getAllCourse = async () => {
    let allCourse = await ContextValue.getAllMainSubCourse();
    console.log("course =",allCourse , allCourse.courses);
    setCourse(allCourse.allCourse)
    setAllCourse(allCourse.courses);
  };

  const [inpval, setINP] = useState({
    Name: "",
    Email: "",
    Number: "",
    Pname: "",
    Pnumber: "",
    RegistrationDate: "",
    Course: "",
    subCourse:"",
    Counselor: "",
    counselorNumber:"",
    CounselorId: "",
    RegistrationFees: "",
    paidFees: "",
    CourseFees:"",
    TrainerName: "",
    TrainerId: "",
    BatchMode: "",
    PaymentMode: "",
    Remark: "",
    EMI:"",
    totalInstallment:"",
    status:"Process",
    PaymentMethod:"",
    joinTime:"",
    joinDate:"",
    counselorReference:""
  });

  function isAllFieldsFilled() {
    for (const key in inpval) {
        if (inpval.hasOwnProperty(key)) {
            if (!inpval[key]) {
              console.log('false field')
                return false; // Return false if any field is empty
            }
        }
    }
    console.log('true field')

    return true; // Return true if all fields are filled
}


  const addinpdata = async (e) => {
    e.preventDefault();
    console.log('register value =', inpval)
    ContextValue.updateProgress(30)
    ContextValue.updateBarStatus(true)
    try {
      const res = await fetch('https://registration-backend2.onrender.com/registerStudent', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(inpval),
      });

      ContextValue.updateProgress(60)

      const data = await res.json();

      const googleSheetResponse = await fetch('https://registration-backend2.onrender.com/google-sheet-data', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });

      const googleSheetResponseData  = await googleSheetResponse.json();
      ContextValue.updateProgress(100)
      ContextValue.updateBarStatus(false)
      ContextValue.SuccessMsg()
      navigate('/Add-Registered-Student/registrationReceipt',{state:{data:data}})
      EmptyFilled()
      console.log("Data", data)
    }
    catch (error) {
      ContextValue.updateProgress(100)
      ContextValue.updateBarStatus(false)
      Swal.fire({   
        icon:  'error',
        title: 'Oops...',
        text:  'Something went wrong!',
      })
      
      console.log('error =', error.message)
    }
  };

  const EmptyFilled = ()=>{

  let tempInpVal = inpval;

  for (let key in inpval){

      tempInpVal[key] = ""
  }

  setINP(tempInpVal)

  }


  let trainerData = {}

  const getTrainer = async () => {
    const trainerData = await ContextValue.getAllTrainer();
    console.log("trainer data =", trainerData)
    setTrainer(trainerData)
  }

  const setTrainerData = (e) => {
    console.log('trainer data =',e.target.selectedIndex,trainerData[e.target.selectedIndex],trainerData)
    setINP({
      ...inpval,
      [e.target.name]: e.target.value,
      ["TrainerId"]: trainer[(e.target.selectedIndex-1)].code
    })

    const status = isAllFieldsFilled()
    setAllFieldStatus(status)
     
  }

  const setMainCourse  =(subCourse)=>
  {
    let mainCourse;
    course.map(data=>{
      data.subCourse.map(element=>{
        if(element===subCourse){
          mainCourse = data.mainCourse
        }
      })
    })

    console.log('sub and main Course =',subCourse,mainCourse)
    setINP({...inpval, ["Course"]:mainCourse,["subCourse"]:subCourse})

    const status = isAllFieldsFilled()
    setAllFieldStatus(status)

  }

  const setCounselorData = (e)=>{

    console.log('select index =',e.target.selectedIndex,counselor[(e.target.selectedIndex)-1].counselorNo)
    setINP({...inpval,["CounselorId"]:counselor[(e.target.selectedIndex)-1].counselorNo,["Counselor"]:e.target.value,["counselorReference"]:counselor[(e.target.selectedIndex)-1].counselorReference})
    const status = isAllFieldsFilled()
    setAllFieldStatus(status)
  }

  const setMethod  =(value)=>{
    setMethodStatus(value)
    if(value==="EMI")
    {
      setINP({...inpval,["PaymentMode"]:"By Bank",["PaymentMethod"]:value})
      const status = isAllFieldsFilled()
      setAllFieldStatus(status)
    }
  }

  return (
    <>

      <Header />
      <div className='sidebar-main-container'>
      <HashLoader color="#3c84b1" />
        {/* <Cslidebar /> */}
      {/* <div className='pos-center'>
      <HashLoader color="#3c84b1" />
    </div> */}
        <div className="content-body">
          <div className="container-fluid">
            <div className="row page-titles mx-0">
              <div className="col-sm-6 p-md-0">
                <div className="welcome-text">
                  <h4>Resigster Student</h4>
                </div>
         
              </div>
              <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="breadcrumb-item active">
                    <a href="javascript:void(0);">Students</a>
                  </li>
                  <li className="breadcrumb-item active">
                    <a href="javascript:void(0);">Add Student</a>
                  </li>
                </ol>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12 col-xxl-12 col-sm-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">Basic Info</h5>
                  </div>
                  <div>
                    <form action="#" method="post">
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Name</label>
                            <input
                              type="text"
                              value={inpval.Name}
                              onChange={(e) =>{
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                });
                                const status = isAllFieldsFilled()
                                setAllFieldStatus(status)
                                }
                              }
                              name="Name"
                              class="form-control"
                              id="exampleInputPassword1"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Number</label>
                            <input
                              type="number"
                              max="10"
                              value={inpval.Number}
                              onChange={(e) =>{
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                });  const status = isAllFieldsFilled()
                                setAllFieldStatus(status)
                              }
                              }
                              name="Number"
                              class="form-control"
                              id="exampleInputPassword1"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Email</label>
                            <input
                              type="email"
                              value={inpval.Email}
                              onChange={(e) =>{
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                });
                                const status = isAllFieldsFilled()
                                setAllFieldStatus(status)
                              }
                              }
                              name="Email"
                              class="form-control"
                              id="exampleInputPassword1"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Parent Name</label>
                            <input
                              type="text"
                              value={inpval.Pname}
                              onChange={(e) =>{
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                  
                                });
                                const status = isAllFieldsFilled()
                                setAllFieldStatus(status)
                              }
                              }
                              name="Pname"
                              class="form-control"
                              id="exampleInputPassword1"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Parent Number</label>
                            <input
                              type="number"
                              max="10"
                              value={inpval.Pnumber}
                              onChange={(e) =>{
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                });
                                const status = isAllFieldsFilled()
                                setAllFieldStatus(status)
                              }
                              }
                              name="Pnumber"
                              class="form-control"
                              id="exampleInputPassword1"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Registration Date</label>
                            <input
                              type="date"
                              value={inpval.JoiningDate}
                              onChange={(e) =>{
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                });
                                const status = isAllFieldsFilled()
                                setAllFieldStatus(status)
                              }
                              }
                              name="RegistrationDate"
                              class="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Counsellor</label>
                            {counselor && 
              <div>
            <select className="counselor-section custom-select mr-sm-2" required name='counselor' onChange={(e) => setCounselorData(e)}>
              <option selected>Choose Counselor...</option>
              {counselor.map((data,index) => 
              {
                return (
                  <option value={data.Name}>{data.Name}</option>
                )
              })}
            </select>
            </div>
            }
                          </div>
                        </div>

                         <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Counsellor Number</label>
                            <input
                              type="number"
                              max="10"
                              value={inpval.counselorNumber}
                              onChange={(e) =>{
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                });
                                const status = isAllFieldsFilled()
                                setAllFieldStatus(status)
                              }
                              }
                              name="counselorNumber"
                              class="form-control"
                              id="exampleInputPassword1"
                            />
                          </div>
                        </div>

                       {/* <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Trainer Name </label>
                            {trainer && <select className="custom-select mr-sm-2" required name='TrainerName' onChange={(e) => setTrainerData(e)
                            }>
                              <option selected>Choose...</option>
                              {trainer.map((data,index) => {
                               
                                return (
                                  <option value={data.Name}>{data.Name}</option>
                                )
                              })}

                            </select>
                            }
                          </div>
                        </div> */}
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Registration Amount</label>
                            <input
                              type="number"
                              max="10"
                              value={inpval.RegistrationFees}
                              onChange={(e) =>{
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                });
                                const status = isAllFieldsFilled()
                                setAllFieldStatus(status)
                              }
                              }
                              name="RegistrationFees"
                              class="form-control"
                              id="exampleInputPassword1"
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Course Fees</label>
                            <input
                              type="number"
                              max="10"
                              onChange={(e) => {
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                });
                                const status = isAllFieldsFilled()
                                setAllFieldStatus(status)
                                }
                              }
                              name="CourseFees"
                              class="form-control"
                              id="exampleInputPassword1"
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Batch mode</label>
                            <select
                              id="exampleInputPassword1"
                              type="select"
                              name="BatchMode"
                              class="form-control"
                              onChange={(e) =>{
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                });
                                const status = isAllFieldsFilled()
                                setAllFieldStatus(status)
                              }
                              }
                            >
                              <option disabled selected>
                                --select Batch Mode--
                              </option>
                              <option value="online">Online</option>
                              <option value="offline">Offline</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Payment Method</label>
                            <select
                              id="exampleInputPassword1"
                              type="select"
                              name="PaymentMethod"
                              class="form-control"
                              onChange={(e) =>{
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                });setMethod(e.target.value);
                                const status = isAllFieldsFilled()
                                setAllFieldStatus(status)
                              }
                              }
                            >
                              <option disabled selected>
                                --Payment Method--
                              </option>
                              <option value="EMI">EMI</option>
                              <option value="Installment">Installment</option>
                              <option value="OTP">One Time Payment</option>
                            </select>
                          </div>
                        </div>

                        {/* Total installment and EMI getter */}

                      {methodStatus==="EMI" &&  <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Total EMI Month</label>
                            <input
                              type="text"
                              onChange={(e) =>{
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                  
                                });  const status = isAllFieldsFilled()
                                setAllFieldStatus(status)
                              }
                              }
                              name="EMI"
                              class="form-control"
                              id="exampleInputPassword1"
                            />
                          </div>
                        </div>}
                      {methodStatus==="Installment" &&  <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Total Installment</label>
                            <select
                              id="exampleInputPassword1"
                              type="select"
                              name="totalInstallment"
                              class="form-control"
                              onChange={(e) =>{
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                });
                                const status = isAllFieldsFilled()
                                setAllFieldStatus(status)
                              }
                              }
                            >
                              <option disabled selected>
                                --Total Installment--
                              </option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                            </select>
                          </div>
                        </div>}

                       {methodStatus==="OTP" && <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Full Payment</label>
                            <input
                              type="number"
                              onChange={(e) => {
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                });
                                const status = isAllFieldsFilled()
                                setAllFieldStatus(status)
                              }
                              }
                              name="paidFees"
                              class="form-control"
                              id="exampleInputPassword1"
                            />
                          </div>
                        </div>}

                     {/* {
                     methodStatus==="EMI" ?   
                     <>                 
                       <div className="col-lg-6 col-md-6 col-sm-12">
                       <div className="form-group">
                         <label className="form-label">Payment mode</label>
                         <input
                           id="exampleInputPassword1"
                           type="text"
                           name="PaymentMode"
                           class="form-control"
                           value = "By Bank"
                         />
                          
                       </div>
                        </div>
                     </>
                      : 
                      <>                                           
                       <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Payment mode</label>
                            <select
                              id="exampleInputPassword1"
                              type="select"
                              name="PaymentMode"
                              class="form-control"
                              onChange={(e) =>
                                setINP({
                                  ...inpval,
                                  [e.target.name] : e.target.value,
                                })
                              }
                            >
                              <option disabled selected>
                                --select Payment Mode--
                              </option>
                              <option value="Cash">Cash</option>
                              <option value="UPI">UPI</option>
                            </select>
                          </div>
                        </div>
                        </>

                        } */}

{
                     methodStatus==="EMI" ?   
                     <>                 
                      <div className="col-lg-6 col-md-6 col-sm-12">
                       <div className="form-group">
                         <label className="form-label">Payment mode</label>
                         <input
                           id="exampleInputPassword1"
                           type="text"
                           name="PaymentMode"
                           class="form-control"
                           value = "By Bank"
                         />
                          
                       </div>
                        </div>
                     </>
                      : 
                      <>   
                      <div className="not-emi-section col-lg-6">                                        
                         <div className="col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Payment mode</label>
                            <select
                              id="exampleInputPassword1"
                              type="select"
                              name="PaymentMode"
                              class="form-control"
                              onChange={(e) =>{
                                setINP({
                                  ...inpval,
                                  [e.target.name] : e.target.value,
                                });
                                const status = isAllFieldsFilled()
                                setAllFieldStatus(status)
                                }
                              }
                            >
                              <option disabled selected>
                                --select Payment Mode--
                              </option>
                              <option value="Cash">Cash</option>
                              <option value="UPI">UPI</option>
                            </select>
                          </div>
                        </div>
                        </div>
                        </>

                        }


                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Batch Course</label>
                            {allcourse && <select
                              id="exampleInputPassword1"
                              type="select"
                              name="Course"
                              class="form-control"
                              onChange={(e) => setMainCourse(e.target.value)}
                            >
                              <option disabled selected>
                                --select Batch Mode--
                              </option>
                              {
                                allcourse.map((data) => {
                                  return <option value={data}>{data}</option>;
                                })}
                            </select>}
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Batch Join</label>
                            <div className="date-time-section">
                          <div className="date-sec">
                            <input type="date" 
                             onChange={(e) =>{ 
                              setINP({
                                ...inpval,
                                [e.target.name]: e.target.value,
                              });
                              const status = isAllFieldsFilled()
                              setAllFieldStatus(status)
                              }
                            }
                            name="joinDate"
                             className="form-control"></input>
                          </div>
                          <div className="time-sec" >
                            <input type="time"
                             onChange={(e) => {
                              setINP({
                                ...inpval,
                                [e.target.name]: e.target.value,
                              });
                              const status = isAllFieldsFilled()
                              setAllFieldStatus(status)
                            }
                            }
                            name="joinTime"
                            className="form-control"></input>
                          </div>
                          </div>
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="form-label">Remark</label>
                            <input
                              type="text"

                              onChange={(e) =>{
                                setINP({
                                  ...inpval,
                                  [e.target.name]: e.target.value,
                                });
                                const status = isAllFieldsFilled()
                                setAllFieldStatus(status)
                              }
                              }
                              name="Remark"
                              class="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                            />
                          </div>
                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <button
                            type="submit"
                            onClick={addinpdata}
                            className="btn btn-primary"
                            // disabled={allFieldStatus===false?true:false}
                          >
                            Submit
                          </button>
                          <button type="submit" className="btn btn-light">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterStudentAdd;

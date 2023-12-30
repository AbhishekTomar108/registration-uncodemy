import React, { useEffect, useState, useContext } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link, NavLink, useParams,useNavigate, useLocation } from 'react-router-dom';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import { StudentContext } from '../context/StudentState'

function ShowDemo() {
 

    const location = useLocation();
    const { demoList, demoStudentData } = location.state;
    let sameDateTime = [];
    let studentData = [];
 
    let ContextValue = useContext(StudentContext);

    const navigation = useNavigate()

    let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


    const date = new Date();

    const day = date.getDate()<10?`0${date.getDate()}`:date.getDate();
    console.log("day",day)
    const month = date.getMonth();
    const year = date.getFullYear();


    // const getTrainerdemo = async () => {

    //     const res = await fetch("https://dashboard-backend3-85dw.onrender.com/getDemoes", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({ TrainerId: localStorage.getItem('TrainerId'), month: monthName[month], day: day.toString(), year: year.toString() })
    //     });

    //     const data = await res.json();
    //     console.log('data of demo =', data)
    //     if (res.status === 422 || !data) {
    //         console.log("error ");

    //     }
    //     filterDemo(data)
    // }
    useEffect(() => {
        // fetchTrainerStatus()
        // filterDemo(allDemo)
     
    }, [])

    // async function fetchTrainerStatus() {
    //     try {
    //       const status = await ContextValue.checkTrainer();
          
    //   console.log('status of trainer =', status);
    //   if(status.status==="active"){
    //     // getTrainerdemo();
    //   }
    //   else{
    //     navigation('/')
    //     alert('you are not authorized')
    //   }
    
    //     } catch (error) {
    //       console.error('Error fetching admin status:', error);
    //     }
    //   }

    // const filterDemo = (data) => {
    //     data.map((demoData, demoIndex) => {
    //         let sameDateStatus = false;
    //         sameDateTime.map((dateTimeData, index) => {
    //             console.log('demodata=', demoData.Time, dateTimeData.date, demoData.Date, dateTimeData.time, demoIndex)
    //             if (demoData.Time === dateTimeData.time && demoData.Date === dateTimeData.date) {
    //                 console.log('if demo', demoIndex)
    //                 sameDateStatus = true;
    //                 studentData[index].push(demoData)
    //             }
    //         })
    //         if (sameDateStatus === false) {
    //             console.log('else demo')

    //             sameDateTime.push({
    //                 date: demoData.Date,
    //                 time: demoData.Time,
    //                 link: demoData.classLink,
    //                 CounselorName: (demoData.CounselorName?demoData.CounselorName:""),
    //                 Trainer: (demoData.Trainer?demoData.Trainer:"")
    //             })

    //             studentData.push([demoData])
    //         }
    //     })

    //     setDemoList(sameDateTime)
    //     setDemoStudentData(studentData)
    //     console.log('demo overview =',sameDateTime,studentData)
    // }

    console.log('same date =', sameDateTime,sameDateTime.length,studentData, studentData[0])

    return (
        <>
            <Header />
            <div className='sidebar-main-container'>
            <Sidebar/>
         
            <div className='main-container'>
                <div className="card-body w-80">
                    <div className="table-responsive recentOrderTable">
                    <table id="datatable"  className="table table-striped table-bordered"cellspacing="0" width="100%" >
                            <thead>
                                <tr>
                                    <th scope="col">No.</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">No Of Candidate</th>
                                    <th scope="col">Counsellor</th>
                                    <th scope="col">Trainer</th>
                                    <th scope="col">Link</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {demoList && demoList.map((data, index) => {
                                    return (
                                        <tr>
                                            <td>{index+1}</td>
                                            <td>{data.date}</td>
                                            <td>{data.time}</td>
                                            <td>{demoStudentData[index].length}</td>
                                            <td>{data.CounselorName}</td>
                                            <td>{data.Trainer}</td>
                                            <td><Link to={data.link}><button className='btn btn-primary'>Class Link</button></Link ></td>
                                            <td> <NavLink to={`/trainer/teacherdemo`}> <button className="btn btn-success" onClick={e=>{localStorage.setItem('demoData',JSON.stringify(demoStudentData[index]))}}  ><RemoveRedEyeIcon /></button></NavLink></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default ShowDemo
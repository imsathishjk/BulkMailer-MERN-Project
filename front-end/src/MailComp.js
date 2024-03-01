import { useState } from "react";
import axios from "axios";
import "./index.css";
import * as XLSX from "xlsx";

function MailComp() {
    const [msg, setMsg] = useState();
    const [status, setStatus] = useState(false);
    const [totalEmail, setTotalEmail] = useState();
    const [mailCount, setMailCount] = useState(0);
    const [mailText, setMailtext] = useState(false)


    function handleChange(e) {
        setMsg(e.target.value)
    }
    function handleSend() {
        setStatus(true);
        axios.post("http://localhost:5000/sendmail", { msg: msg, emailList: totalEmail })
            .then((data) => {
                if (data.data === true) {
                    alert("Email sent Successfully")
                    setStatus(false)
                } else {
                   alert("Email send Failed")
                }
            })
        setMsg("");
        setMailCount(0);

    }

    function handleFile(e) {
        const file = e.target.files[0];

        console.log(file);

        const reader = new FileReader();
        reader.onload = function (e) {
            const data = e.target.result;
            const workBook = XLSX.read(data, { type: "binary" });
            console.log(workBook);
            // enter actual excel worksheet
            const sheetName = workBook.SheetNames[0];
            console.log(sheetName);
            // read sheet 1 files in actual excel worksheet
            const workSheet = workBook.Sheets[sheetName];
            console.log(workSheet);
            // to get email list separetly using json and it return values in array; and also define path inside it
            const emailList = XLSX.utils.sheet_to_json(workSheet, { header: "A" });
            console.log(emailList)
            // using map function to extract email id from emailList and stored it;
            const totalEmailList = emailList.map(function (item) {
                return item.A;
            })
            setTotalEmail(totalEmailList);
            setMailCount(totalEmailList.length);
            setMailtext(true);
        }
        reader.readAsBinaryString(file);
    }

    return (
        <div className=" m-2 font-[Ubuntu] bg-black text-white border-[#FF486A] border rounded-xl">
            <div >
                <h1 className="text-3xl mb-5 text-[#FF486A] text-left w-full p-5">Bulk Mailer <i class="fa-solid fa-paper-plane"></i></h1>
                <p className="text-lg text-left p-5 tracking-wider">We can help your business with sending bulk mails at once...</p>
            </div>
            <div className=" mt-5 px-10 py-10 flex flex-col items-center justify-center">
                <div className="mt-5 mb-5 w-full">
                    <textarea placeholder="Enter your message here" className="w-full h-60 p-5 text-black border rounded-md outline-gray-300  border-gay-400" onChange={handleChange} value={msg}></textarea>
                </div>
                <div className="border border-dashed p-8 border-[black] rounded-xl">
                    <input type="file" onChange={handleFile} />
                </div>
                <div className="mt-5">
                    {mailText ? <p className="text-xl">Total Mail in this file : <span className="text-[#FF486A] font-bold">{mailCount}</span></p> : <p className="text-lg tracking-wider">You haven't added anything yet</p>}
                </div>
                <div className="mt-5 mb-2">
                    <button onClick={handleSend} className="bg-[#FF486A] py-4 px-9 text-lg rounded-md flex justify-center items-center gap-2 text-white  cursor-pointer hover:bg-[white] hover:text-black border-2 border-[#FF486A] transition-all 0.5s ease-in-out" >{status ? "Sending Mail...": "Send Mail"}<i class="fa-regular fa-paper-plane"></i></button>
                </div>
            </div>
        </div>
    )
}
export default MailComp;
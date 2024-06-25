import { useState } from "react"
import Alert from "@/app/components/alert/Alert"
import Loader from "@/app/components/loader/Loader"
import { useRouter } from "next/navigation"

export default function LetterForm({initialValue}) {
    const [values, setValues] = useState(initialValue)
    const [letterCount, setLetterCount] = useState(0)
    const [checkAlert, setCheckAlert] = useState(false);
    const [responseAlert, setResponseAlert] = useState(false);
    const [responseAlertMsg, setResponseAlertMsg] = useState("");
    const [responseAlertEffect, setResponseAlertEffect] = useState(()=>()=>{});
    const [loading, setLoading] = useState(false);

    const router = useRouter()

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
    }

    const handleLetterCount = (e) => {
        setLetterCount(e.target.value.length)
    }

    const handleSubmit = () => {
        if (values.to=="" || values.from=="" || values.body=="") {
            alert("편지를 모두 작성해주세요!")
            return
        }

        setCheckAlert(true);
    }

    const redirectToLetters = () => {
        router.push('/dear-yerin/letters')
    }

    const handleRealSubmit = async () => {
        setCheckAlert(false)
        setLoading(true)
        try {
            const options = {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                  "Content-type": "application/json"
                }
              }

            const response = await fetch(process.env.NEXT_PUBLIC_ROOT_URL + "/api/dear-yerin", options)
            if (response.status != 200) {
                throw new Error()
            }

            const letter = await response.json()
            setResponseAlertEffect(()=>()=>redirectToLetters())
            setResponseAlertMsg(`💌\n${values.to}에게\n성공적으로 편지를 전달했어요 !`)
            setValues(initialValue)
        } catch (err) {
            setResponseAlertEffect(()=>()=>setResponseAlert(false))
            setResponseAlertMsg(`😢\n편지를 전달하지 못했어요.\n잠시 후 다시 시도해주세요.`)
        }
        setLoading(false)
        setResponseAlert(true)
    }


    return (
        <>
            {loading && <Loader/>}
            {responseAlert && <Alert msg={responseAlertMsg} responses={["닫기"]} effects={[responseAlertEffect]}/>}
            {checkAlert && <Alert msg={`💌\n한번 보낸 편지는\n수정하거나 삭제할 수 없습니다.\n\n${values.to}에게 편지를 보내시겠습니까?`} responses={["네", "더 쓸래요."]} effects={[()=>{handleRealSubmit()}, ()=>{setCheckAlert(false)}]}/>}
            <div className="form-container">
                <div style={{width: "100%", height: "80%", position:"absolute", top: "4%"}}>
                    <div className="to-container">
                        <input type="text" name="to" value={values.to} maxLength={7} onChange={handleChange} placeholder="예리니" id="to-input"/>
                        에게
                    </div>
                    <div className="body-container">
                        <textarea type="text" name="body" value={values.body} maxLength={500} onChange={(e) => {handleChange(e), handleLetterCount(e)}} id="body-input"></textarea>
                        <div className="letter-count">{letterCount}/500</div>
                    </div>
                    <div className="from-container">
                        사랑을 담아,
                        <input type="text" name="from"value={values.from} maxLength={7} onChange={handleChange} placeholder="당근이" id="from-input"/>
                    </div>
                </div>
                <button className="letter-submit-btn" onClick={handleSubmit}>편지 보내기</button>
            </div>
        </>
    )
}
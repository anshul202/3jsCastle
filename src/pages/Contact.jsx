import { Suspense, useRef, useState } from "react"
import emailjs from '@emailjs/browser';
import { Canvas } from "@react-three/fiber";
import Fox from "../models/Fox";
import Loader from "../Components/Loader";
import Alert from "../Components/Alert";
import useAlert from '../hooks/useAlert'

const Contact = () => {
  const formRef=useRef(null);
  const [form,setForm]= useState({name:'',email:'',message:''});
  const [isLoading,setisLoading] = useState(false);
  const [currentAnimation, setcurrentAnimation] = useState('idle')

  const [alert,showAlert,hideAlert]=useAlert(); 

  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  };
  const handleSubmit=(e)=>{
    setcurrentAnimation('running');
    e.preventDefault();
    setisLoading(true);
    console.log(import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,)
    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,

      {
        from_name:form.name,
        to_name:"Anshul",
        from_email:form.email,
        to_email:'sainian45@gmail.com',
        message:form.message
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    ).then(()=>{
      setisLoading(false);
      showAlert({show:true,text:'Message Sent Successfully',type:'success'});
      
      setcurrentAnimation('run');
      setTimeout(() => {
        setcurrentAnimation('idle');
        setForm({name:'',email:'',message:''});
      }, 3000);
      //TO DO ALERT 
      //to hide a alert
    }).catch((error)=>{
      setisLoading(false);
      showAlert({show:true,text:'I didnt recieve your message',type:'danger'});
      setcurrentAnimation('idle');
      console.log(error);
    })
  }
  const handlFocus=()=>{
    setcurrentAnimation('walk')
  }
  const handleBlur=()=>{
    setcurrentAnimation('idle')
  }
  
  return (
    <section className="relative flex lg:flex-row flex-col max-container h-[100vh]">
      {alert.show && <Alert {...alert}/>}
      {/* <Alert text="test"/> */}

      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text">Get in Touch</h1>
        <form className="w-full flex flex-col gap-7 mt-14"onSubmit={handleSubmit}>
          <label className="text-black-500 font-semibold">
            Name
            <input
            type="text"
            name="name"
            className="input"
            placeholder="John Doe"
            required
            value={form.name}
            onChange={handleChange}
            onFocus={handlFocus}
            onBlur={handleBlur}
            />
          </label>
          <label className="text-black-500 font-semibold">
            Email
            <input
            type="email"
            name="email"
            className="input"
            placeholder="john@mail.com"
            required
            value={form.email}
            onChange={handleChange}
            onFocus={handlFocus}
            onBlur={handleBlur}
            />
          </label>
          <label className="text-black-500 font-semibold">
            Message
            <textarea
            rows={4}
            cols={50}
            className="textarea"
            name="message"
            placeholder="Let me know"
            required
            value={form.message}
            onChange={handleChange}
            onFocus={handlFocus}
            onBlur={handleBlur}
            />
          </label>
          <button
          type="submit"
          className="btn"
          onFocus={handlFocus}
          onBlur={handleBlur}
          disabled={isLoading}>
            {isLoading?'sending...':'Send Message'}
          </button>
  
        </form>
      </div>
      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]
      ">
        <Canvas
        camera={{
          position:[0,0,5],
          fov:70,
          near:0.1,
          far:1000
        }}>
          <directionalLight position={[0,1,1]} intensity={2.5}/>
          <ambientLight intensity={0.5}/>
          <Suspense fallback={<Loader/>}>
            <Fox
            currentAnimation={currentAnimation}
            position={[0.5,0.35,0]}
            rotation={[12.6,-0.76,0]}
            scale={[0.5,0.5,0.5]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}

export default Contact
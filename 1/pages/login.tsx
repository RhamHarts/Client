import type { NextPage } from "next";
import { useCallback } from "react";

const Login: NextPage = () => {
  const onForgotPasswordClick = useCallback(() => {
    // Please sync "Register" to the project
  }, []);

  const onLoginBtnClick = useCallback(() => {
    // Please sync "Register" to the project
  }, []);

  const onRegisterNewAccountClick = useCallback(() => {
    // Please sync "Register" to the project
  }, []);

  return (
    <div className="w-full relative bg-gray-200 h-[1024px] overflow-hidden text-left text-31xl text-black font-inter">
      <div className="absolute top-[112px] left-[133px] bg-white w-[1200px] h-[800px] flex flex-row items-center justify-start">
        <img
          className="w-[576.9px] relative h-[797px] overflow-hidden shrink-0 object-cover"
          alt=""
          src="/frame@2x.png"
        />
        <img
          className="w-[621.6px] relative h-[800px] object-contain"
          alt=""
          src="/image-5@2x.png"
        />
      </div>
      <div className="absolute top-[151px] left-[951px] font-black">Login</div>
      <div className="absolute top-[279px] left-[795px] w-[452px] h-[610px] text-11xl">
        <div className="absolute top-[173px] left-[0px] w-[452px] h-[138px]">
          <input
            className="[outline:none] bg-gray-100 absolute top-[57px] left-[-1px] rounded-8xs box-border w-[454px] h-[82px] border-[2px] border-solid border-black"
            type="text"
          />
          <div className="absolute top-[0px] left-[0px]">Password</div>
        </div>
        <a
          className="[text-decoration:none] absolute top-[316px] left-[0px] text-[25px] font-light font-poppins text-navy cursor-pointer"
          onClick={onForgotPasswordClick}
        >
          Forgot Password
        </a>
        <div className="absolute top-[0px] left-[0px] w-[452px] h-[138px]">
          <div className="absolute top-[0px] left-[0px]">
            Usernam
            <span className="tracking-[0.5em]">e</span>
          </div>
          <input
            className="[outline:none] bg-gray-100 absolute top-[57px] left-[-1px] rounded-8xs box-border w-[454px] h-[82px] border-[2px] border-solid border-black"
            type="text"
          />
        </div>
        <button
          className="cursor-pointer p-0 bg-[transparent] absolute top-[411px] left-[0px] [background:linear-gradient(91.89deg,_#00fc65,_rgba(0,_202,_81,_0)),_linear-gradient(91.89deg,_#91ffbd,_rgba(19,_205,_230,_0.55)_99.99%,_rgba(0,_240,_255,_0))] box-border w-[452px] h-20 border-[2px] border-solid border-black"
          onClick={onLoginBtnClick}
        >
          <div className="absolute top-[17px] left-[185px] text-11xl font-semibold font-poppins text-black text-left">
            Login
          </div>
        </button>
        <button className="cursor-pointer p-0 bg-[transparent] absolute top-[530px] left-[0px] [background:linear-gradient(91.89deg,_#00fc65,_rgba(0,_202,_81,_0)),_linear-gradient(91.89deg,_#91ffbd,_rgba(19,_205,_230,_0.55)_99.99%,_rgba(0,_240,_255,_0))] box-border w-[452px] h-20 border-[2px] border-solid border-black">
          <div
            className="absolute top-[17px] left-[59px] text-11xl font-semibold font-poppins text-black text-left cursor-pointer"
            onClick={onRegisterNewAccountClick}
          >
            Register New Account
          </div>
        </button>
      </div>
    </div>
  );
};

export default Login;

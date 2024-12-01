import type { NextPage } from "next";

const Desktop: NextPage = () => {
  return (
    <div className="w-full relative bg-gray-200 h-[720px] overflow-hidden text-left text-31xl text-black font-inter">
      <div className="absolute h-[calc(100%_+_2.2px)] top-[-0.9px] right-[0px] bottom-[-1.3px] w-[856px]">
        <img
          className="absolute h-full top-[0px] right-[0px] bottom-[0px] max-h-full w-[483.6px] object-contain"
          alt=""
          src="/image-5@2x.png"
        />
        <img
          className="absolute h-[calc(100%_-_3.2px)] w-[calc(100%_-_483px)] top-[1.9px] right-[483px] bottom-[1.3px] left-[0px] max-w-full overflow-hidden max-h-full object-cover"
          alt=""
          src="/image-1@2x.png"
        />
        <div className="absolute h-[calc(100%_-_4.2px)] w-[calc(100%_-_484px)] top-[1.9px] right-[484px] bottom-[2.3px] left-[0px] bg-gray-300" />
      </div>
      <div className="absolute top-[calc(50%_-_359px)] left-[calc(50%_+_116px)] font-black inline-block w-[140px]">
        Login
      </div>
      <div className="absolute top-[calc(50%_-_270px)] left-[calc(50%_-_31.2px)] w-[452px] h-[585.3px] text-11xl">
        <div className="absolute top-[calc(50%_-_143.35px)] left-[calc(50%_-_226px)] w-[452px] h-[138px]">
          <div className="absolute top-[0px] left-[0px]">Password</div>
          <input
            className="[outline:none] bg-gray-100 absolute top-[57px] left-[-1px] rounded-8xs box-border w-[454px] h-[82px] border-[2px] border-solid border-black"
            type="text"
          />
        </div>
        <a className="[text-decoration:none] absolute top-[calc(50%_-_5.65px)] left-[calc(50%_-_224.8px)] text-[24px] font-light font-poppins text-navy inline-block w-[206px] h-[35px]">
          Forgot Password
        </a>
        <div className="absolute h-[21.17%] top-[0%] bottom-[78.83%] left-[calc(50%_-_226px)] flex flex-col items-start justify-start gap-[22px]">
          <div className="relative">
            Usernam
            <span className="tracking-[0.5em]">e</span>
          </div>
          <input
            className="[outline:none] bg-gray-100 w-[454px] relative rounded-8xs box-border h-[82px] border-[2px] border-solid border-black"
            type="text"
          />
        </div>
        <button className="cursor-pointer p-0 bg-[transparent] absolute top-[calc(50%_+_94.65px)] left-[calc(50%_-_226px)] [background:linear-gradient(91.89deg,_#00fc65,_rgba(0,_202,_81,_0)),_linear-gradient(91.89deg,_#91ffbd,_rgba(19,_205,_230,_0.55)_99.99%,_rgba(0,_240,_255,_0))] box-border w-[452px] h-[79px] border-[2px] border-solid border-black">
          <div className="absolute top-[17px] left-[185px] text-11xl font-semibold font-poppins text-black text-left">
            Login
          </div>
        </button>
        <button className="cursor-pointer p-0 bg-[transparent] absolute top-[calc(50%_+_213.65px)] left-[calc(50%_-_226px)] [background:linear-gradient(91.89deg,_#00fc65,_rgba(0,_202,_81,_0)),_linear-gradient(91.89deg,_#91ffbd,_rgba(19,_205,_230,_0.55)_99.99%,_rgba(0,_240,_255,_0))] box-border w-[452px] h-[79px] border-[2px] border-solid border-black">
          <div className="absolute top-[21.52%] left-[13.05%] text-11xl font-semibold font-poppins text-black text-left">
            Register New Account
          </div>
        </button>
      </div>
    </div>
  );
};

export default Desktop;

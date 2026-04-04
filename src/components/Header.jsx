import React from 'react'

const Header = ({isAdmin, click}) => {
  return (
      <div className='bg-[#0A0A0A] h-fit border-b border-[#666B74] flex'>
        <div className='flex p-5 cursor-pointer'>
            <svg className='bg-[#D4AF37] h-10 w-10 rounded-2xl' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" d="M12 2.844L9.19 9.22l-6.377 2.811l6.377 2.811L12 21.22l2.812-6.377l6.376-2.811l-6.376-2.811z" /></svg>
            <div className='pl-2'>
                <h1 className='text-white text-2xl h-6' >FinBook</h1>
                  <p className='text-[#666B74] text-[0.8rem] h-2' >Easy Finance</p>
            </div>   
        </div>
        <div className='place-content-center text-center w-screen cursor-pointer'>
            <h1 className='text-white text-3xl pr-26'>
                {(isAdmin) ? 'Admin' : 'Viewer'}
            </h1>
        </div>
          <div className='place-content-center absolute right-0 ml-5'>
              <button onClick={click} className='bg-[#D4AF37] text-black px-3 py-1 rounded-lg m-5 hover:bg-[#a98e35]'>Switch</button>
        </div>
    </div>
  )
}

export default Header

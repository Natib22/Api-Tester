




const Objectrender = ({ response , currLine ,indent }: { response: object  , currLine : number , indent: number}) => {

    const size  = Object.keys(response).length
  

  return (
    <>
       <div className='flex justify-between hover:bg-[#323030] px-[6px] items-center rounded-lg'> <span className={` ${
            indent === 1 ? 'pl-3' : indent === 2 ? 'pl-10' : indent === 3 ? 'pl-10' : 'pl-0'
          } `}>{"{"}</span> <p className='text-xs text-gray-400 font-light  text-opacity-40'>{currLine - 1}</p> </div>
      {Object.entries(response).map(([key, value] , index) => {
       
        return (
          <div key={key} className={`flex hover:bg-[#323030] px-[6px] items-center rounded-lg justify-between ${
            indent === 1 ? 'pl-6' : indent === 2 ? 'pl-12' : indent === 3 ? 'pl-16' : 'pl-0'
          }`} >
            <div className='flex '>
              <p className='text-purple-400 '>{  '"' + key + '"' }</p> <p className='mx-1'> : </p>
              
              <p
className={`${
  value === true || value === false 
    ? 'text-yellow-400'
    : !isNaN(parseInt(value)) 
    ? 'text-blue-400'
    : 'text-green-400'
}`}
>
{JSON.stringify(value)}
</p>
            </div>
            <p className='text-xs text-gray-400 font-light  text-opacity-40'>{currLine + index}</p> 
          </div>
        );
      })}
      <div className='flex justify-between hover:bg-[#323030] px-[6px] items-center rounded-lg'> <span className={` ${
            indent === 1 ? 'pl-3' : indent === 2 ? 'pl-10' : indent === 3 ? 'pl-10' : 'pl-0'
          } `} >{"},"}</span> <p className='text-xs text-gray-400 font-light  text-opacity-40'>{currLine+ 1 + size}</p> </div>
    </>
  );
};


export default Objectrender;
import Objectrender from "./Objectrender";



const Arrayrender = ({ response , lineNumbers }: { response: object[] , lineNumbers:number[]  }) => {
   
    // if (Array.isArray(response[0])){
    //   return <Arrayrender response = {response} />
    // }
    // else {
      return (
        <>
          {response.map((item, index) => {
            const temp = lineNumbers[index];
           
          
            return (
              <div key={index} className="">
                <Objectrender key={index} response={item} currLine={temp}  indent={3}/>
              </div>
            );
          })}
        </>
      );
      
    

    
  };

  export default Arrayrender;
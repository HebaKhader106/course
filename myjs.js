//select the start game button
document.querySelector(".control-buttons span").onclick = function(){
  //set name unknown
    let yourName = prompt("Whats your name?");
      if(yourName == null || yourName == ""){
          document.querySelector(".name span").innerHTML = "Unknown";
     //name is noot empty
      }else{
       //set name to yor name   
        document.querySelector(".name span").innerHTML = yourName; 
      }
     //remove splash screen 
      document.querySelector(".control-buttons").remove();
};
//Effect duration
let duration = 1000;

//select block container
let blockContainer = document.querySelector(".memorygame-block");

//creat array from game block
let blocks = Array.from(blockContainer.children);
 
//creat range of keys
let orderRange = [...Array(blocks.length).keys()];
  
  shuffle(orderRange);

//add order css property to game blocks
blocks.forEach((block , index) =>{
   block.style.order =orderRange[index];
  
   //add click event
   block.addEventListener('click',function(){
   
    //trigger the flip block function
    flipBlock(block);

   });
 });

//flip block function
function flipBlock(selectedBlock) {

  // Add Class is-flipped
  selectedBlock.classList.add('is-flipped');
 //colect all flipped cards
 let allflippedBlocks = blocks.filter(flipBlock =>flipBlock.classList.contains('is-flipped') );
  
 //if theres two selected block
  if(allflippedBlocks.length === 2){
     
  //stop clicking function
   stopclicking();
  //chich matched block function
   checkedMatchedBlocks(allflippedBlocks[0],allflippedBlocks[1]);

}

}

//stop clicking function
function stopclicking(){
  //add class no clicking on main container
   blockContainer.classList.add('no-clicking');
  
    setTimeout(()=>{
     //remove class no clicking after the duration
     blockContainer.classList.remove('no-clicking');
 
    },duration);

  }
  //chich matched block function
   function checkedMatchedBlocks(firstBlock,secondBlock){
     let triesElement = document.querySelector('.trise span');

     if(firstBlock.dataset.technology === secondBlock.dataset.technology){
       setTimeout(( ) =>{
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
  
        firstBlock.classList.remove('has-match');
        secondBlock.classList.remove('has-match');
       
       },duration);
      // firstBlock.classList.remove('is-flipped');
      //  secondBlock.classList.remove('is-flipped');
 
      //  firstBlock.classList.remove('has-match');
      //  secondBlock.classList.remove('has-match');
      
       document.getElementById('success').play();
     
      } else {
      triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
      
      setTimeout(() => {
       firstBlock.classList.remove('is-flipped');
       secondBlock.classList.remove('is-flipped');
    
      }, duration);
      
      document.getElementById('fail').play();

     }

   }
//shuffle function
function shuffle(array){

 //setting vars
 let current = array.length,
     temp,
     random;
    while (current > 0) {

     //get random nubmer
     random = Math.floor(Math.random()*current);
      
     //decrese length by one
     current--;

     //[1]save current element in stash
     temp = array[current];

     //[2]current element = random element
      array[current] = array[random];

      //[3]random element = get element from stash
       array[random] = temp;

    }
    return array;



}
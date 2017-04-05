window.onload=()=>{
   const maze = document.getElementsByTagName('canvas')[0].getContext('2d')
   maze.fillStyle='#d5d5d5'
   maze.fillRect(0,0,500,500)
   drawgrid(maze,20)
}



function drawgrid(maze,interval){
    for(let i=1;i<maze.canvas.width;i+=interval){
        maze.moveTo(i,0)
        maze.lineTo(i,maze.canvas.width-1)
        maze.stroke()
    }
    for(let j =1;j<maze.canvas.height;j+=interval){
        maze.moveTo(0,j)
        maze.lineTo(maze.canvas.height-1,j)
        maze.stroke()
    }
}
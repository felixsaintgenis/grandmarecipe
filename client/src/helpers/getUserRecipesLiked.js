const getUserRecipesLiked = (recipes, userLikesArray, lastThreeRecipesLiked, userId) => {
    let recipeId;
    recipes.map((recipe) => {
      recipeId = recipe._id
      recipe.likes.map((like) => {
          like === userId && userLikesArray.includes(like) === false ? userLikesArray.push(recipeId) :
          null
      }) 
    });   
    recipes && recipes.map( recipe => {
      userLikesArray.includes(recipe._id) ?
      lastThreeRecipesLiked.push(recipe) : 
      null
    }
    )
    return lastThreeRecipesLiked
  }
  
  export default getUserRecipesLiked;
  
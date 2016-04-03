/**
 *  Static -
 *  The MathLib class provides powerful abstract algorithms and functions supporting the controller and the model classes.
 *  The algorithms take full advantage of the weekly typed language that JavaScript is
 *  @class com.Storybuilder.Utility.MathLib
 */

var Utility = com.Storybuilder.Utility.Namespace.getNamespace('com.Storybuilder.Utility');

Utility.MathLib = function(){
    
    //Array quickSort code taken from http://snipplr.com/view/51648/
    //The algorithm was improved for sorting by an object variable
    
    //objArray needs to assign the quickSort function to it in the calling class!!
    
    /**
     *  Customized version of the quickSort algorithm in order to sort an array of generic objects by a member variable
     *  @function quickSort
     *  @param {Object []} objArray - the array of objects we want to search in
     *  @param {string} funcName - Accessor of the variable that will guide the sort
     *  @return object
     */
    function quickSort(objArray, funcName) {
        if (objArray.length <= 1){
            return objArray;
        } 
        var object;
        var pivot = Math.floor(Math.random()*objArray.length)
        var left = [], 
        right=[];
        var pivotElem = objArray.splice(pivot,1)
        for (object in objArray) {
            if (objArray[object][funcName]() <= pivotElem[0][funcName]())
                left.push(objArray[object])
            else
                right.push(objArray[object])
        }
        return [].concat(quickSort(left, funcName),pivotElem,quickSort(right, funcName));
    }
    
    /**
     *  Checks whether a value is an integer
     *  @function isInt
     *  @param {int} n - The number we want to check
     *  @return boolean
     */
    function isInt(n){
        return typeof n === 'number' && n % 1 == 0;
    }
    
    /**
     *  Returns the image ratio
     *  @function getImageRatio
     *  @param {Image} Image - the Image object
     *  @return float
     */
    function getImageRatio(Image){
        return (Image.width/Image.height);
    }
    
    /**
     *  Returns the dimension ratio
     *  @function getDimensionRatio
     *  @param {int} x - x value
     *  @param {int} y - y value
     *  @return float
     */
    function getDimensionRatio(x, y){
        return x/y;
    }
   
    
    /**
     *  Algorithm finding a generic object in an array by a particular member
     *  @function findObjectByMember
     *  @param {object} term - the variable we are comparing the search with
     *  @param {Object []} objArray - the array of objects we want to search in
     *  @param {string} funcName - Accessor of that specific field
     *  @return object
     */
    function findObjectByMember(term, objArray, funcName){
        var o;
        for(var i = 0; i<objArray.length; i++){
            o = objArray[i];
            if(o[funcName]() == term){
                return o;
            }
        }
        return null;
    }
    
    /**
     *  Algorithm finding a generic object in an array by a particular many members
     *  @function findObjectByMultiMembers
     *  @param {object} termArray - the variable array we are comparing the search with
     *  @param {Object []} objArray - the array of objects we want to search in
     *  @param {string} functionArray - Accessor array of that specific field
     *  @return object
     */
    function findObjectByMultiMembers(termArray, objArray, functionArray){
        var o;
        var termsLength = termArray.length;
        var innerIndex;
        for(var i = 0; i<objArray.length; i++){
            innerIndex = 0;
            o = objArray[i];
            for(var j = 0; j<termsLength; j++){
                var currentFunction = functionArray[j];
                if(termArray[j] == o[currentFunction]()){
                    innerIndex++;
                }
            }
            if(innerIndex == termsLength){
                return o;
            }
        }
        return null;
    }
    
    /**
     *  Algorithm returning the position of an object in an array, based on a member variable
     *  @function findIndexFromMember
     *  @param {object} searchTerm - the variable we are comparing the search with
     *  @param {Object []} objArray - the array of objects we want to search in
     *  @param {string} funcName - Accessor of that specific field
     *  @return int
     */
    function findIndexFromMember(searchTerm, objArray, funcName){
        var o;
        for(var i = 0; i<objArray.length; i++){
            o = objArray[i];
            var term = o[funcName]();
            if(searchTerm == term){
                return i;
            }
        }
        return -1;
    }
    
    /**
     *  Algorithm removing an element in an array by passing an index
     *  @function removeElementFromArray
     *  @param {int} index - the index of the object we want to remove
     *  @param {Object []} array - the target object array
     *  @return int
     */
    function removeElementFromArray(index, array){
        array.splice(index, 1);
    }
    
    /**
     *  Checks whether a number is in a predefined range
     *  @function isInRange
     *  @param {number} value - the value we want to test
     *  @param {number} min - the lower bound value
     *  @param {number} max - the upper bound value
     *  @return boolean
     */
    function isInRange(value, min, max){
        return (value >= min && value <= max) ? true : false;
    }
    
    return{
        quickSort: quickSort,
        isInt: isInt,
        getImageRatio: getImageRatio,
        getDimensionRatio: getDimensionRatio,
        findObjectByMember: findObjectByMember,
        findObjectByMultiMembers: findObjectByMultiMembers,
        findIndexFromMember: findIndexFromMember,
        removeElementFromArray: removeElementFromArray,
        isInRange: isInRange
    };
    
}();
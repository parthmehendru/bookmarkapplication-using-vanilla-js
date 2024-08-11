// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark)

function saveBookmark(e){
    
    // Get form values
    var sitename = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName, siteUrl)){
        return false;
      }
    var bookmark = {
        name: sitename,
        url: siteUrl
    }

    // test if bookmarks is null
    if(localStorage.getItem('bookmarks') === null){
        // initialize an array
        var bookmarks = [];
        // Add to array
        bookmarks.push(bookmark);
        // set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    } else {
        // Get bookmarks from local storage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookmark);
        // Re-set back to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    // clear form

    document.getElementById('myForm').reset();

    // Re-fetch bookmarks
    fetchBookmarks();

    e.preventDefault();



}
// delete bookmark
function deleteBookmark(url){
    // get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // loop through bookmarks

    for(var i = 0;i<bookmarks.length;i++){
        if(bookmarks[i].url == url){
            // remove from array
            bookmarks.splice(i, 1);
        }
    }
    // Re-set back to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

    // Re-fetch bookmarks
    fetchBookmarks();
}
// fetch bookmarks

function fetchBookmarks(){
    if(localStorage.getItem('bookmarks')!=null){
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // get output id
        var bookmarksResults = document.getElementById('bookmarksResults');
    
        // build output
        bookmarksResults.innerHTML = '';
    
        for(var i = 0;i<bookmarks.length; i++){
            var name = bookmarks[i].name;
            var url = bookmarks[i].url;
    
            bookmarksResults.innerHTML+= '<div class="well">' +
                                         '<h3>'+name+
                                          ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
                                          ' <a onClick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'+
                                          '</h3>' +
                                         '</div>'
        }
    }
    
}

function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
      alert('Please fill in the form');
      return false;
    }
  
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
  
    if(!siteUrl.match(regex)){
      alert('Please use a valid URL');
      return false;
    }
  
    return true;
  }
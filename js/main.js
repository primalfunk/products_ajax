$(document).ready( function() {
  //get the initial select function working for Index
  let main = $('.main')
  let html

  function init_index() {
    $.ajax({
      dataType: 'json',
      // data: 'id=10',
      url: "http://json-server.devpointlabs.com/api/v1/products",
      type: 'GET'
    }).done( function(res) {
      for (let i = res.length - 1; i > -1; i--) {
        html = `<li class="prod${i}">Name: ${res[i].name}, 
          Base Price: ${res[i].base_price},
          Color: ${res[i].color},
          Weight: ${res[i].weight}
          <button id="edit${i}">Edit</button>
          <button id="delete${i}">Delete</button></li>`
        main.append(html)
      }
      init_dynamic()
    })
  }

  function wipe(el) {
    $(el).empty()
  }


  function init_new() {
    let form = $('.form')
    $(".new").on("click", function() {
      console.log("Inside the listener for new, got " + this )
      form.is(":visible") ? form.hide() : form.show()
      if ($('#submit').is(":visible")) {
        console.log("You should be able to see the Submit button.")
      }
    })
  }
    
  function init_submit() {
    //wire up the submit button
    $(document).on("click", "#submit", function () {
      console.log("Inside the listener for submit, it's " + this)
      let name = $(".name").val()
      let base_price = $("base_price").val()
      let color = $(".color").val()
      let weight = $(".weight").val()
      let info = { "name": name, "base_price": base_price, "color": color, "weight": weight }
      $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: "http://json-server.devpointlabs.com/api/v1/products",
        data: JSON.stringify(info)
      }).done(function (res) {
        $(".form").hide()
        console.log("Finished ajax call to create new item: " + res)
        wipe(main)
        whole_setup()
        alert("Item name: " + name + " successfully added to the database.")
      }).fail(function (textStatus, errorThrown) {
        console.log('textStatus:')
        console.log(textStatus)
        console.log('errorThrown:')
        console.log(errorThrown)
        alert("Sorry, dude.")
      })
    })
  }

  function init_dynamic() {
    // wire up the edit buttons
    $(main).find("[id^=edit]").each(function () {
      $(this).click(function () {
        console.log("This is item at index: " + $(this).attr('id').slice(4))
        edit_item($(this).attr('id').slice(4))
      })
    })
    // wire up the delete buttons
    $(main).find("[id^=delete]").each(function () {
      $(this).click(function () {
        console.log("This is item at index: " + $(this).attr('id').slice(6))
        delete_item($(this).attr('id').slice(6))
      })
    })
  }
    
  function edit_item(index) {
    let name = $(".name").val()
    let base_price = $("base_price").val()
    let color = $(".color").val()
    let weight = $(".weight").val()
    let info = { "name": name, "base_price": base_price, "color": color, "weight": weight }
    debugger
    $.ajax({
      type: "PUT",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      url: "http://json-server.devpointlabs.com/api/v1/product/" + index,
      data: JSON.stringify(info)
    }).done(function (res) {
      $(".form").hide()
      console.log("Finished ajax call to edit item: " + res)
      wipe(main)
      whole_setup()
      alert("Item name: " + name + " successfully edited in the database.")
    }).fail(function (textStatus, errorThrown) {
      console.log('textStatus:')
      console.log(textStatus)
      console.log('errorThrown:')
      console.log(errorThrown)
      alert("Sorry, dude.")
    })
  }

  function delete_item(index) {
    $.ajax({
      dataType: "json",
      url: "http://json-server.devpointlabs.com/api/v1/products/" + index,
      type: 'DELETE'
    }).done(function () {
      alert("Deleted item at index: " + index)
    })
  }

  function whole_setup() {
    init_index()
    init_new()
    init_submit()
  }

  whole_setup()

})
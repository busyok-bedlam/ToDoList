(function($){ // что бы не конфликтовать с другой средой илидругими библиотеками
	'use strict ';

	$(document).ready(function() {

		function addItem(item, key){
			var $list = $('[data-status="'+ item.status + '"] ').find('.list-group')
			var $btn_edit = $('<button>')
							.addClass('btn btn-primary btn-xs btn-edit-task')
							.append('<span class="glyphicon glyphicon-pencil"aria-hidden="true"></span>');

			var $btn_remove = $('<button>')
							.addClass('btn btn-danger btn-xs btn-remove-task')
							.append('<span class="glyphicon glyphicon-remove"aria-hidden="true"></span>');

			var $button_container = $('<div>')
							.addClass('button_container pull-right')
							.append($btn_edit)
							.append($btn_remove)

			$('<li>')
				.appendTo( $list )
				.addClass('list-group-item')
				.text( item.title )
				.attr('data-key',key)
				.append($button_container)

			countKey();//вызываем функцию подсчета объектов в хранилищи
		}
		

		for (var key in localStorage ){
			if ( localStorage.hasOwnProperty(key) ){
				
			var item = JSON.parse(localStorage[key])
				
			addItem(item , key)
			
			}
		}
		
	
	var $formAddTask = $('#formAddTask');


// прописываешь значении из локального хранилища 
	console.log(localStorage)

	$('#btn-add-task').on('click',function(){

		var data = {
			key : new Date().getTime(),
			value : {
				title: $formAddTask.find( '[name = "title"]' ).val(),
				status: 1 
			}
		}
		localStorage.setItem( data.key , JSON.stringify(data.value) )
		console.log(data.value)

		$formAddTask.find( '[name = "title"]' ).val('')
		//очищаем инпут для нового использования 
	
		addItem(data.value , data.key)
		//добавляем ключ 
		$formAddTask.modal('hide')

		});

	$('#remove-all-task').on('click',function(){
// перебираем localStorage по каждому ключу ,распарсиваем и передаем объект ,в функцию на удаление 
		for (var key in localStorage ){	

			if ( localStorage.hasOwnProperty(key) ){


				var item = JSON.parse(localStorage[key])
				//считать кол-во ключей и выводить в бадже

				var $list = $('[data-status="'+ item.status + '"] ').find('.list-group')
				// находим блок ,с соотвутствующим номером задачи,находим дочерний список
				$('li.list-group-item').remove();
				// удаляем элемент списка
			}
		}
			// когда все элементы были удалены из DOM ,очищаем localStarage
			localStorage.clear();
			countKey();

		})

//  функция счетчика
	function countKey(){
			var count1 = 0,
				count2 = 0,
				count3 = 0;

			for (var key in localStorage ){
				if ( localStorage.hasOwnProperty(key) ){
				
			var item = JSON.parse(localStorage[key])
				//проверяем значение status в каждом объекте и считаем их соответственно 
			    if(item.status == 1 ) count1 ++;
				if(item.status == 2 ) count2 ++;
				if(item.status == 3 ) count3 ++;
				
			}
			
		}	
		//  записываем посчитанные значение в DOM
			$('[badge-status="1"]').text(count1);
			$('[badge-status="2"]').text(count2);
			$('[badge-status="3"]').text(count3);
} 


// 

		$('body').on('click','.btn-remove-task',function(){
				// this это btn на которыйкликнули
				var $itemBlock = $(this).parents('[data-key]');
				console.log($itemBlock.data('key'));
				var key = $itemBlock.data('key');
				//метод data  читает атрибут который содержит
				 // нужный параметр и читает в нужном формате
				 localStorage.removeItem(key)
				 // удаляет из локального
				 countKey();//делаем пересчет данных 
				 $itemBlock.remove()
		})

	// var $formEditTask = $('#formEditTask');
		var $formEditTask = $('#formEditTask')

		$('body').on('click','.btn-edit-task',function(){
		

		$formEditTask.modal('show')
		var $itemBlock = $(this).parents('[data-key]');
		var key = $itemBlock.data('key');//метод data  читает атрибут который содержит
		var item =JSON.parse(localStorage.getItem(key))

		$formEditTask.find('[name=title]').val(item.title)
		$formEditTask.find('[name=status]').val(item.status)
		$formEditTask.find('[name=key]').val(key)

		// console.log(massItem)
	})
		$('#btnEditTask').on('click',function(){
			var task ={
				title : $('[name=title]',$formEditTask).val(),
				status : $('[name=status]',$formEditTask).val()

			}
			console.log('task',task);
			var key = $('[name=key]',$formEditTask).val();

			localStorage.setItem(key,JSON.stringify(task))
			$formEditTask.modal('hide')

			$('[data-key='+ key + ']').remove();
			addItem(task,key);
			countKey();




		// 	var data = {
		// 	key : new Date().getTime(),
		// 	value : {
		// 		title: $formAddTask.find( '[name = "title"]' ).val(),
		// 		status: 2 //todo 
		// 	}
		// }
		// localStorage.setItem( data.key , JSON.stringify(data.value) )
		// console.log(data.value)

		// $formAddTask.find( '[name = "title"]' ).val('')
		// //очищаем инпут для нового использования 
	
		// addItem(data.value , data.key)
		})
}) 









// функция объекта обжект позволяет получить список всех
// ключей объекта 
// object.keys(localStorage)


})(jQuery)


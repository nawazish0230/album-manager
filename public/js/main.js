// $(document).ready(function(){
//     $('.delete-genre').on('click', function(){
//         var id = $(this).data('id');
//         var url = '/genres/delete/'+id;
//         if(confirm('Deleting Genre?')){
//             $.ajax({
//                 url: url,
//                 type: 'DELETE',
//                 success: function(result){
//                     console.log('Deleting genre...');
//                     window.location.href='/genre';
//                 },
//                 error: function(err){
//                     console.log(err);
//                 }
//             })
//         }
//     })


// //     $('.delete-album').on('click', function(){
// //         var id = $(this).data('id');
// //         var url = '/albums/delete/'+id;
// //         if(confirm('Deleting album?')){
// //             $.ajax({
// //                 url: url,
// //                 type: 'DELETE',
// //                 success: function(result){
// //                     console.log('Deleting album...');
// //                     window.location.href='/album';
// //                 },
// //                 error: function(err){
// //                     console.log(err);
// //                 }
// //             })
// //         }
// //     })
// // })
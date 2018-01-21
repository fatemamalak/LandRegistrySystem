/**

*/
/**
@param { org.acme.land.registry.add_property} p
@transaction
*/


function add_property(p){
	p.property.owner= p.newOwner;
	return getAssetRegistry('org.acme.land.registry.Property')  
		.then(function (assetRegistry)	{
        	return assetRegistry.update(p.property);    
		});
}
/**
@param { org.acme.land.registry.ownership_transfer} transfer
@transaction
*/
function ownership_transfer(transfer){
  console.log(transfer.property.Property_id);
  	var d=get_property_details(transfer.property.Property_id);
  	if(d.status.equals("Owned") && transfer.seller.seller_adhar_id.equals(d.owner.owner_adhar_id)){
		transfer.property.owner=transfer.newOwner;
  		//transfer.owner=transfer.newOwner.N;
      	transfer.property.status="doc_7_12_pending";
  		console.log(transfer.newOwner.Name);
  		transfer.seller=transfer.seller.Name
  		transfer.owner.owner_adhar_id=transfer.newOwner.buyer_adhar_id;
	  	return getAssetRegistry('org.acme.land.registry.Property')
  		.then(function (assetRegistry){
      	return assetRegistry.update(transfer.property);
      });
      console.log("Hello"+JSON.stringify(transfer.property));
    }
  	else{
    	console.log("Invalid Transaction");
    }
} 
function get_property_details(id){
    var request = require('request')
	return request.get('http://40.83.126.91:3000/api/org.acme.land.registry.Property/'+id, function(res, err)  {
	console.log(err.body);
 }); 
}
/**
@param { org.acme.land.registry.revert_ownership} revert
@transaction
*/
function revert_ownership(revert){
  console.log(revert.property.Property_id);
  	get_property_details(revert.property.Property_id);
		revert.property.owner=revert.newOwner;
  		console.log(revert.newOwner.Name);
  		return getAssetRegistry('org.acme.land.registry.Property')
  		.then(function (assetRegistry){
      	return assetRegistry.update(revert.property);
      });
    
} 
/**
@param { org.acme.land.registry.ownership_complete} complete
@transaction
*/
function ownership_complete(complete){
  console.log("  $$$$$$$ HELLO    "+get_property_details(1234));
	complete.property.status="Owned";
  	return getAssetRegistry('org.acme.land.registry.Property')
  		.then(function (assetRegistry){
      	return assetRegistry.update(complete.property);
      });
}




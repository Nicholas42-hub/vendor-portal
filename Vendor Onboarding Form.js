(function(webapi, $){
    function safeAjax(ajaxOptions) {
        var deferredAjax = $.Deferred();

        shell.getTokenDeferred().done(function (token) {
            // add headers for AJAX
            if (!ajaxOptions.headers) {
                $.extend(ajaxOptions, {
                    headers: {
                        "__RequestVerificationToken": token
                    }
                }); 
            } else {
                ajaxOptions.headers["__RequestVerificationToken"] = token;
            }
            $.ajax(ajaxOptions)
                .done(function(data, textStatus, jqXHR) {
                    validateLoginSession(data, textStatus, jqXHR, deferredAjax.resolve);
                }).fail(deferredAjax.reject); //AJAX
        }).fail(function () {
            deferredAjax.rejectWith(this, arguments); // on token failure pass the token AJAX and args
        });

        return deferredAjax.promise();	
    }
    webapi.safeAjax = safeAjax;
})(window.webapi = window.webapi || {}, jQuery);

function toggleQuotesObtained() {
  const quotesDropdown = document.getElementById('quotes_obtained_yn');
  const quotesInput = document.getElementById('quotes_obtained_input');
  const reasonInput = document.getElementById('reason');
  const reasonLabel = document.querySelector('label[for="reason"]');

  if (quotesDropdown.value === 'no') {
    // Show the reason input and make it required
    quotesInput.classList.remove('hidden');
    quotesDropdown.setAttribute('required', '');
    reasonInput.setAttribute('required', '');
    
    // Add required indicator to reason label if not present
    if (!reasonLabel.querySelector('.required-field')) {
      const requiredSpan = document.createElement('span');
      requiredSpan.className = 'required-field';
      requiredSpan.textContent = '*';
      reasonLabel.innerHTML = 'If no, please provide a reason:' + requiredSpan.outerHTML;
    }
  } else {
    // Hide the reason input and remove required attributes
    quotesInput.classList.add('hidden');
    reasonInput.removeAttribute('required');
    reasonInput.value = ''; // Clear the input value
    quotesDropdown.setCustomValidity('');
    
    // Reset the label to original state
    reasonLabel.innerHTML = 'If no, please provide a reason:';
  }
}

function toggleAgreeOverhead_quote() {
  const vendorType = document.getElementById('VendorType');
  const quotesSection = document.getElementById('quotesSection');
  const quotesDropdown = document.getElementById('quotes_obtained_yn');
  const reasonInput = document.getElementById('reason');
  const backorder = document.getElementById('back_order')
  const order_expiry_days = document.getElementById('order_expiry_days')
  const rebate = document.getElementById('rebate')
  if (vendorType.value === 'STOCK') {
    quotesSection.classList.add('hidden');
    quotesDropdown.removeAttribute('required');
    reasonInput.removeAttribute('required');
  } else {
    quotesSection.classList.remove('hidden');
    quotesDropdown.setAttribute('required', '');
  }
  if (vendorType.value === 'OVERHEADS') {
    backorder.classList.add('hidden');
    rebate.classList.add('hidden');
    order_expiry_days.classList.add('hidden');
    rebate.removeAttribute('required');
    order_expiry_days.removeAttribute('required');
    backorder.removeAttribute('required');
    
  } else {
    backorder.classList.remove('hidden');
    rebate.classList.remove('hidden');
    order_expiry_days.classList.remove('hidden');
    backorder.setAttribute('required', '');
    order_expiry_days.setAttribute('required', '');
    rebate.setAttribute('required', '');
  }
}


  // Ensure the input field is hidden initially
  document.addEventListener('DOMContentLoaded', () => {
    toggleQuotesObtained();
  });
 
  function toggleAgreeDiscount() {
    const quotesDropdown = document.getElementById('agreed_discount_selection_yn');
    const quotesInput = document.getElementById('agreed_discount_input');

    if (quotesDropdown.value === 'yes') {
      quotesInput.classList.remove('hidden');
    } else {
      quotesInput.classList.add('hidden');
    }
  }
  // Ensure the input field is hidden initially
  document.addEventListener('DOMContentLoaded', () => {
    toggleQuotesObtained();
  });


    function toggleInvoiceDiscount() {
      const discountDropdown = document.getElementById('invoice_discount_yn');
      const discountInput = document.getElementById('invoice_discount_input');

      if (discountDropdown.value === 'yes') {
        discountInput.classList.remove('hidden');
      } else {
        discountInput.classList.add('hidden');
      }
    }

    // Ensure the input field is hidden initially
    document.addEventListener('DOMContentLoaded', () => {
      toggleInvoiceDiscount();
    });

    function toggleSettlementDiscount() {
        const discountDropdown = document.getElementById('settlement_discount_yn');
        const discountInput = document.getElementById('settlement_discount_input');
  
        if (discountDropdown.value === 'yes') {
          discountInput.classList.remove('hidden');
        } else {
          discountInput.classList.add('hidden');
        }
      }
  
      // Ensure the input field is hidden initially
      document.addEventListener('DOMContentLoaded', () => {
        toggleSettlementDiscount();
      });
  
      function toggleFoatRebate() {
        const discountDropdown = document.getElementById('flat_rebate_yn');
        const discountInput = document.getElementById('flat_rebate_input');
  
        if (discountDropdown.value === 'yes') {
          discountInput.classList.remove('hidden');
        } else {
          discountInput.classList.add('hidden');
        }
      }
  
      // Ensure the input field is hidden initially
      document.addEventListener('DOMContentLoaded', () => {
        toggleSettlementDiscount();
      });


      function toggleGrowthrebate() {
        const discountDropdown = document.getElementById('growth_rebate_yn');
        const discountInput = document.getElementById('growth_rebate_input');
  
        if (discountDropdown.value === 'yes') {
          discountInput.classList.remove('hidden');
        } else {
          discountInput.classList.add('hidden');
        }
      }
  
      // Ensure the input field is hidden initially
      document.addEventListener('DOMContentLoaded', () => {
        toggleSettlementDiscount();
      });


      function toggleFiststoreranging() {
        const discountDropdown = document.getElementById('first_store_ranging_yn');
        const discountInput = document.getElementById('first_store_ranging_input');
  
        if (discountDropdown.value === 'yes') {
          discountInput.classList.remove('hidden');
        } else {
          discountInput.classList.add('hidden');
        }
      }
  
      // Ensure the input field is hidden initially
      document.addEventListener('DOMContentLoaded', () => {
        toggleSettlementDiscount();
      });


      function toggleNewstorebuild() {
        const discountDropdown = document.getElementById('new_store_build_yn');
        const discountInput = document.getElementById('new_store_build_input');
  
        if (discountDropdown.value === 'yes') {
          discountInput.classList.remove('hidden');
        } else {
          discountInput.classList.add('hidden');
        }
      }
  
      // Ensure the input field is hidden initially
      document.addEventListener('DOMContentLoaded', () => {
        toggleSettlementDiscount();
      });

      function toggleMarketrebate() {
        const discountDropdown = document.getElementById('marketing_rebate_yn');
        const discountInput = document.getElementById('marketing_rebate_input');
  
        if (discountDropdown.value === 'yes') {
          discountInput.classList.remove('hidden');
        } else {
          discountInput.classList.add('hidden');
        }
      }
  
      // Ensure the input field is hidden initially
      document.addEventListener('DOMContentLoaded', () => {
        toggleSettlementDiscount();
      });

      function togglePromotionalfund() {
        const discountDropdown = document.getElementById('promotional_fund_yn');
        const discountInput = document.getElementById('promotional_fund_input');
  
        if (discountDropdown.value === 'yes') {
          discountInput.classList.remove('hidden');
        } else {
          discountInput.classList.add('hidden');
        }
      }
  
      // Ensure the input field is hidden initially
      document.addEventListener('DOMContentLoaded', () => {
        toggleSettlementDiscount();
      });

      function toggleChildVendorSearch() {
        const childVendorSelect = document.getElementById('child_vendor_yn');
        const searchSection = document.getElementById('child_vendor_search');
        const parentVendorSelect = document.getElementById('parent_vendor');
        
        if (childVendorSelect.value === 'yes') {
            searchSection.classList.remove('hidden');
            parentVendorSelect.setAttribute('required', '');
            
            // Refresh Select2
            $('#parent_vendor').select2({
                placeholder: "Select an option",
                allowClear: true
            });
        } else {
            searchSection.classList.add('hidden');
            parentVendorSelect.removeAttribute('required');
            $('#parent_vendor').val(null).trigger('change');
        }
    }

      // function loadParentVendors() {
      //   const searchSelect = document.getElementById('parent_vendor_search');
        
      //   // Fetch contacts from the contacts table
      //   webapi.safeAjax({
      //     type: "GET",
      //     url: "/_api/contacts?$select=contactid,fullname",
      //     contentType: "application/json",
      //     success: function(response) {
      //       // Clear existing options except the first one
      //       searchSelect.innerHTML = '<option value="" disabled selected>Select a parent vendor</option>';
            
      //       if (response.value && response.value.length > 0) {
      //         // Sort contacts by fullname
      //         response.value.sort((a, b) => a.fullname.localeCompare(b.fullname));
              
      //         // Add each contact as an option
      //         response.value.forEach(contact => {
      //           const option = document.createElement('option');
      //           option.value = contact.contactid;
      //           option.textContent = contact.fullname;
      //           searchSelect.appendChild(option);
      //         });
      //       }
      //     },
      //     error: function(xhr, textStatus, errorThrown) {
      //       console.error('Error loading parent vendors:', errorThrown);
      //     }
      //   });
      // }

      function toggleSubmitButtons() {
        const childVendorSelect = document.getElementById('child_vendor_yn');
        const regularSubmit = document.getElementById('regular_submit');
        const childVendorSubmit = document.getElementById('child_vendor_submit');
        
        if (childVendorSelect.value === 'yes') {
          regularSubmit.classList.add('hidden');
          childVendorSubmit.classList.remove('hidden');
        } else {
          regularSubmit.classList.remove('hidden');
          childVendorSubmit.classList.add('hidden');
        }
      }


      async function checkSimilarVendors(formData) {
        try {
            const response = await webapi.safeAjax({
                type: "GET",
                url: "/_api/contacts?$select=emailaddress1,lastname,description,crb7c_primarytradingbusinessunit,crb7c_vendortype,crb7c_createdvendor",
                contentType: "application/json",
                headers: {
                    "Prefer": "odata.include-annotations=*"
                }
            });
    
            if (!response.value) return { hasSimilarVendors: false };
    
            const existingVendors = response.value.filter(v => v.crb7c_createdvendor === "Yes");
            const similarities = [];
    
            for (const vendor of existingVendors) {
                const similarityScore = calculateVendorSimilarity(formData, vendor);
                if (similarityScore >= 0.7) { // 70% similarity threshold
                    similarities.push({
                        vendor,
                        score: similarityScore,
                        matchedCriteria: getMatchedCriteria(formData, vendor)
                    });
                }
            }
    
            return {
                hasSimilarVendors: similarities.length > 0,
                similarVendors: similarities.sort((a, b) => b.score - a.score)
            };
        } catch (error) {
            console.error("Error checking similar vendors:", error);
            return { hasSimilarVendors: false };
        }
    }
    
    function calculateVendorSimilarity(formData, existingVendor) {
        let score = 0;
        let totalWeight = 0;
    
        // Business name similarity (weight: 0.3)
        const businessNameSimilarity = calculateStringSimilarity(
            formData.get('Business_name').toLowerCase(),
            existingVendor.lastname.toLowerCase()
        );
        score += businessNameSimilarity * 0.3;
        totalWeight += 0.3;
    
        // Email domain similarity (weight: 0.2)
        const emailDomain1 = formData.get('Email').split('@')[1];
        const emailDomain2 = existingVendor.emailaddress1.split('@')[1];
        if (emailDomain1 === emailDomain2) {
            score += 0.2;
        }
        totalWeight += 0.2;
    
        // Business unit match (weight: 0.2)
        if (formData.get('BU') === existingVendor.crb7c_primarytradingbusinessunit) {
            score += 0.2;
        }
        totalWeight += 0.2;
    
        // Vendor type match (weight: 0.2)
        if (formData.get('VendorType') === existingVendor.crb7c_vendortype) {
            score += 0.2;
        }
        totalWeight += 0.2;
    
        // Home country match (weight: 0.1)
        if (formData.get('Companycode') === existingVendor.description) {
            score += 0.1;
        }
        totalWeight += 0.1;
    
        return score / totalWeight;
    }
    
    function calculateStringSimilarity(str1, str2) {
        if (str1 === str2) return 1;
        if (str1.length === 0 || str2.length === 0) return 0;
    
        const len1 = str1.length;
        const len2 = str2.length;
        const matrix = Array(len1 + 1).fill().map(() => Array(len2 + 1).fill(0));
    
        for (let i = 0; i <= len1; i++) matrix[i][0] = i;
        for (let j = 0; j <= len2; j++) matrix[0][j] = j;
    
        for (let i = 1; i <= len1; i++) {
            for (let j = 1; j <= len2; j++) {
                const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j - 1] + cost
                );
            }
        }
    
        return 1 - (matrix[len1][len2] / Math.max(len1, len2));
    }
    
    function getMatchedCriteria(formData, vendor) {
        const matches = [];
    
        // Business name similarity check
        if (calculateStringSimilarity(
            formData.get('Business_name').toLowerCase(),
            vendor.lastname.toLowerCase()
        ) > 0.8) {
            matches.push('Similar business name');
        }
    
        // Email domain match
        if (formData.get('Email').split('@')[1] === vendor.emailaddress1.split('@')[1]) {
            matches.push('Same email domain');
        }
    
        // Business unit match
        if (formData.get('BU') === vendor.crb7c_primarytradingbusinessunit) {
            matches.push('Same business unit');
        }
    
        // Vendor type match
        if (formData.get('VendorType') === vendor.crb7c_vendortype) {
            matches.push('Same vendor type');
        }
    
        // Home country match
        if (formData.get('Companycode') === vendor.description) {
            matches.push('Same home country');
        }
    
        return matches;
    }
    
    function showSimilarityWarning(similarities) {
      const warningDiv = document.createElement('div');
      warningDiv.className = 'popup';
      warningDiv.id = 'similarityWarning';
      warningDiv.innerHTML = `
          <h2>Potential Similar Vendors Found</h2>
          <div class="similarity-content">
              <p>We found existing vendors that are similar to the one you're trying to create:</p>
              <ul>
                  ${similarities.map(sim => `
                      <li>
                          <strong>${sim.vendor.lastname}</strong>
                          <br>
                          Email: ${sim.vendor.emailaddress1}
                          <br>
                          Similarity: ${Math.round(sim.score * 100)}%
                          <br>
                          Matches: ${sim.matchedCriteria.join(', ')}
                      </li>
                  `).join('')}
              </ul>
              <p>Do you still want to proceed with creating this vendor?</p>
              <div class="button-group" style="display: flex; gap: 10px; justify-content: center;">
                  <button 
                      type="button" 
                      class="btn-yes" 
                      onclick="proceedAfterWarning()"
                      style="min-width: 150px; padding: 10px 20px; font-size: 16px; border-radius: 5px; border: none; background-color: #4CAF50; color: white; cursor: pointer;"
                  >Yes, Proceed</button>
                  <button 
                      type="button" 
                      class="btn-no" 
                      onclick="closeSimilarityWarning()"
                      style="min-width: 150px; padding: 10px 20px; font-size: 16px; border-radius: 5px; border: none; background-color: #f44336; color: white; cursor: pointer;"
                  >No, Cancel</button>
              </div>
          </div>
      `;
      
      document.body.appendChild(warningDiv);
      document.getElementById('popupOverlay').classList.add('open-popup-overlay');
      warningDiv.classList.add('open-popup');
  }
    
    function closeSimilarityWarning() {
        const warning = document.getElementById('similarityWarning');
        if (warning) {
            warning.classList.remove('open-popup');
            warning.remove();
        }
        document.getElementById('popupOverlay').classList.remove('open-popup-overlay');
    }
    
    function proceedAfterWarning() {
        closeSimilarityWarning();
        openConfirmPopup();
    }


let googlePlacesAutocomplete;

function initializeGooglePlaces() {
    const addressInput = document.getElementById('Address');
    if (!addressInput) return;

    // Configure autocomplete options
    const options = {
        componentRestrictions: { country: ['au', 'nz'] }, // Restrict to Australia and New Zealand
        fields: ['address_components', 'formatted_address', 'geometry'],
        types: ['address']
    };

    // Initialize Google Places Autocomplete
    googlePlacesAutocomplete = new google.maps.places.Autocomplete(addressInput, options);

    // Add place_changed event listener
    googlePlacesAutocomplete.addListener('place_changed', handlePlaceSelect);

    // Add input event listener for error handling
    addressInput.addEventListener('input', function() {
        const errorDiv = document.getElementById('address-error');
        if (errorDiv) errorDiv.style.display = 'none';
    });
}

function handlePlaceSelect() {
    const place = googlePlacesAutocomplete.getPlace();
    const addressInput = document.getElementById('Address');
    
    if (!place.geometry) {
        showAddressError('Please select an address from the dropdown list');
        return;
    }

    // Parse address components
    let streetNumber = '';
    let route = '';
    let locality = '';
    let area = '';
    let country = '';
    let postcode = '';

    for (const component of place.address_components) {
        const type = component.types[0];
        switch (type) {
            case 'street_number':
                streetNumber = component.long_name;
                break;
            case 'route':
                route = component.long_name;
                break;
            case 'locality':
                locality = component.long_name;
                break;
            case 'administrative_area_level_1':
                area = component.short_name;
                break;
            case 'country':
                country = component.long_name;
                break;
            case 'postal_code':
                postcode = component.long_name;
                break;
        }
    }

    // Set the full formatted address
    addressInput.value = place.formatted_address;

    // Auto-select country in vendor form if applicable
    const countrySelect = document.getElementById('Companycode');
    if (countrySelect && country) {
        if (country === 'Australia') {
            countrySelect.value = 'Australia';
        } else if (country === 'New Zealand') {
            countrySelect.value = 'New Zealand';
        } else {
            countrySelect.value = 'Overseas';
        }
    }
}

function showAddressError(message) {
    const errorDiv = document.getElementById('address-error');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
}

// Initialize Google Places when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeGooglePlaces();
});

// Also add this to your existing handleSubmit and handleChildVendorSubmit functions
const validateAddress = () => {
    const addressInput = document.getElementById('Address');
    if (addressInput && addressInput.value.trim() === '') {
        showAddressError('Please enter an address');
        return false;
    }
    return true;
};
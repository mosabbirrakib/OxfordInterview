<template>
    <div id="bank_account">
        <div class="container">
            <div class="row">
                <div class="col-md-6 text-left">
                    <h3>Bank Accounts</h3>
                </div>
                <div class="col-md-6 text-right">
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#createBankAccount">Add New</button>
                </div>
            </div>

            <div class="mt-4">
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">Account Name</th>
                        <th scope="col">Bank</th>
                        <th scope="col">Account No</th>
                        <th scope="col">Branch</th>
                        <th scope="col">Account Type</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="bank_account in bank_accounts" :key="bank_account.id">
                        <td>{{ bank_account.account_name }}</td>
                        <td>{{ bank_account.financial_organization.name }}</td>
                        <td>{{ bank_account.account_no }}</td>
                        <td>{{ bank_account.branch }}</td>
                        <td v-if="bank_account.account_type == 1">Savings Account</td>
                        <td v-else-if="bank_account.account_type == 2">Current Account</td>
                        <td v-else>Joint Account</td>
                        <td>
                            <button class="btn btn-success btn-sm" data-toggle="modal" data-target="#createBankAccount" @click.prevent="editBankAccount(bank_account)">Edit</button>
                            <button class="btn btn-danger btn-sm" @click.prevent="deleteBankAccount(bank_account.id)">Delete</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div class="modal fade" id="createBankAccount" tabindex="-1" role="dialog" aria-labelledby="createBankAccountLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Create Bank Account</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="account_name" class="col-form-label">Account Name:</label>
                                    <input type="text" v-model="form.account_name" class="form-control" placeholder="Enter Account Name" id="account_name">
                                    <span class="text-danger" v-if="errors.account_name">{{ errors.account_name[0] }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="financial_organization_id" class="col-form-label">Bank:</label>
                                    <select class="form-control" v-model="form.financial_organization_id" id="financial_organization_id">
                                        <option value="0" disabled selected>Select Bank</option>
                                        <option v-for="bank in banks" :key="bank.id" :value="bank.id">{{ bank.name }}</option>
                                    </select>
                                    <span class="text-danger" v-if="errors.financial_organization_id">{{ errors.financial_organization_id[0] }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="account_no" class="col-form-label">Account No:</label>
                                    <input type="text" v-model="form.account_no" class="form-control" placeholder="Enter Account No" id="account_no">
                                    <span class="text-danger" v-if="errors.account_no">{{ errors.account_no[0] }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="branch" class="col-form-label">Branch:</label>
                                    <select class="form-control" v-model="form.branch" id="branch">
                                        <option value="0" disabled selected>Select Branch</option>
                                        <option value="Dhanmondi">Dhanmondi</option>
                                        <option value="Symoli">Symoli</option>
                                        <option value="Kallyanpur">Kallyanpur</option>
                                        <option value="Gulshan">Gulshan</option>
                                        <option value="Badda">Badda</option>
                                        <option value="Uttara">Uttara</option>
                                        <option value="Savar">Savar</option>
                                    </select>
                                    <span class="text-danger" v-if="errors.branch">{{ errors.branch[0] }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="account_type" class="col-form-label">Account Type:</label>
                                    <select class="form-control" v-model="form.account_type" id="account_type">
                                        <option value="0" disabled selected>Select Account Type</option>
                                        <option value="1">Savings Account</option>
                                        <option value="2">Current Account</option>
                                        <option value="3">Joint Account</option>
                                    </select>
                                    <span class="text-danger" v-if="errors.account_type">{{ errors.account_type[0] }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="swift_code" class="col-form-label">Swift Code:</label>
                                    <input type="text" v-model="form.swift_code" class="form-control" id="swift_code" placeholder="Enter Swift Code">
                                    <span class="text-danger" v-if="errors.swift_code">{{ errors.swift_code[0] }}</span>
                                </div>
                                <div class="form-group">
                                    <label for="route_no" class="col-form-label">Route No:</label>
                                    <input type="text" v-model="form.route_no" class="form-control" id="route_no" placeholder="Enter Route No">
                                    <span class="text-danger" v-if="errors.route_no">{{ errors.route_no[0] }}</span>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" v-if="!form.id" @click.prevent="createBankAccount">Create</button>
                            <button type="button" class="btn btn-primary" v-else @click.prevent="updateBankList">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BankAccountComponent",
        data(){
            return{
                form:{},
                errors:{},
            }
        },

        methods: {
            bankAccountList(){
                this.$store.dispatch('bankAccountList')
            },
            bankList(){
                this.$store.dispatch('bankList')
            },
            createBankAccount(){
                axios.post('/api/bank-account', this.form)
                    .then((result) => {
                        this.bankAccountList();
                        this.form = {}
                    }).catch((error) => {
                    this.errors = error.response.data.errors
                });
            },
            updateBankList(){
                axios.put('/api/bank-account/'+this.form.id, this.form)
                    .then((result) => {
                        this.bankAccountList();
                    }).catch((error) => {
                    this.errors = error.response.data.errors
                });
            },
            editBankAccount(bank_account){
                this.form = bank_account
            },
            deleteBankAccount(id){
                this.$store.dispatch('bankDelete', id)
            }
        },

        computed:{
            bank_accounts(){
                return this.$store.getters.bankAccountList;
            },
            banks(){
                return this.$store.getters.bankList;
            }
        },

        created() {
            this.bankAccountList();
            this.bankList();
        }
    }
</script>

<style scoped>

</style>

class ChangesetsController < ApplicationController
  # GET /changesets
  # GET /changesets.xml
  def index
    @changesets = Changeset.unmerged.paginate(:page => params[:page], :order => 'revision DESC')

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @changesets }
    end
  end

  def all
    @changesets = Changeset.paginate(:page => params[:page], :order => 'revision DESC')

    respond_to do |format|
      format.html { render :index }
      format.xml  { render :xml => @changesets }
    end
  end

  # GET /changesets/new
  # GET /changesets/new.xml
  def new
    @changeset = Changeset.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @changeset }
    end
  end

  # GET /changesets/1/edit
  def edit
    @changeset = Changeset.find(params[:id])
  end

  # POST /changesets
  # POST /changesets.xml
  def create
    @changeset = Changeset.new(params[:changeset])

    respond_to do |format|
      if @changeset.save
        format.html { redirect_to(changesets_url) }
        format.xml  { render :xml => @changeset, :status => :created, :location => @changeset }
        format.js { render :template => 'changesets/create.js.erb', :status => :created }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @changeset.errors, :status => :unprocessable_entity }
        format.js { render :template => 'changesets/create.js.erb', :status => :unprocessable_entity }
      end
    end
  end

  # PUT /changesets/1
  # PUT /changesets/1.xml
  def update
    @changeset = Changeset.find(params[:id])

    respond_to do |format|
      if @changeset.update_attributes(params[:changeset])
        format.html { redirect_to(changesets_url) }
        format.xml  { head :ok }
        format.js { render :template => 'changesets/create.js.erb', :status => :created }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @changeset.errors, :status => :unprocessable_entity }
        format.js { render :template => 'changesets/create.js.erb', :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /changesets/1
  # DELETE /changesets/1.xml
  def destroy
    @changeset = Changeset.find(params[:id])
    @changeset.destroy

    respond_to do |format|
      format.html { redirect_to(changesets_url) }
      format.xml  { head :ok }
    end
  end
end

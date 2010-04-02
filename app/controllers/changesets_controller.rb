class ChangesetsController < ApplicationController
  def index
    @changesets = Changeset.unmerged.paginate(:page => params[:page], :order => 'revision DESC')
  end

  def all
    @changesets = Changeset.paginate(:page => params[:page], :order => 'revision DESC')
  end

  def new
    @changeset = Changeset.new
  end

  def edit
    @changeset = Changeset.find(params[:id])
  end

  def create
    @changeset = Changeset.new(params[:changeset])

    respond_to do |format|
      if @changeset.save
        format.html { redirect_to(changesets_url) }
        format.js { render :template => 'changesets/create.js.erb', :status => :created }
      else
        format.html { render :action => "new" }
        format.js { render :template => 'changesets/create.js.erb', :status => :unprocessable_entity }
      end
    end
  end

  def update
    @changeset = Changeset.find(params[:id])

    respond_to do |format|
      if @changeset.update_attributes(params[:changeset])
        format.html { redirect_to(changesets_url) }
        format.js { render :template => 'changesets/create.js.erb', :status => :created }
      else
        format.html { render :action => "edit" }
        format.js { render :template => 'changesets/create.js.erb', :status => :unprocessable_entity }
      end
    end
  end

  def destroy
    @changeset = Changeset.find(params[:id])
    @changeset.destroy

    redirect_to changesets_url
  end
end

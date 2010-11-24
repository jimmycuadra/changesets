class ChangesetsController < ApplicationController
  # class-based per_page is broken in will_paginate 3.0.pre2

  def index
    @changesets = Changeset.unmerged.paginate(:page => params[:page], :order => 'revision DESC', :per_page => 10)
  end

  def all
    @changesets = Changeset.paginate(:page => params[:page], :order => 'revision DESC', :per_page => 10)
    render :index
  end

  def create
    @changeset = Changeset.new(params[:changeset])

    respond_to do |format|
      if @changeset.save
        format.json
      else
        format.json { render :template => "changesets/errors.json.erb" }
      end
    end
  end

  def update
    @changeset = Changeset.find(params[:id])

    respond_to do |format|
      if @changeset.update_attributes(params[:changeset])
        format.json { render :template => "changesets/create.json.erb" }
      else
        format.json { render :template => "changesets/errors.json.erb" }
      end
    end
  end

  def destroy
    @changeset = Changeset.find(params[:id])
    @changeset.destroy

    head :ok
  end
end
